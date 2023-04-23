const USER = require("../Schema/user.schema")
const createToken = require("../util/createToken")
const bcrept = require("bcrypt")
const { uploadImage, deleteImage, getAllValueFromDocument } = require("../util/uploadMedia")
const { sendMailByGmail } = require("../Service/email")

// authentication point
module.exports.registerAAccount = async (req, res) => {
    try {
        const email = req.body.email
        const password = req.body.password
        const confirmPassword = req.body.confirmPassword
        if (!email || !password) {
            return res.json({
                error: "fail",
                massage: "email and password are required"
            })
        }
        const ext = await USER.findOne({ email })

        if (password !== confirmPassword) {
            return res.json({
                error: "fail",
                massage: "Password didn't match"
            })
        }
        if (ext?.email) {
            return res.json({
                error: "fail",
                massage: "User already exiest, try to login"
            })
        }

        const result = await USER.create(req.body)
        result.passwordHashed()
        let token = result.genarateConfirmationToken()
        await result.save({ validateBeforeSave: false })
        let makeMailBody = {
            email: email,
            subject: "Thanks for craete user",
            body: `congratulation for create a new account  varify your account ${req.protocol}://${req.get('host')}${req.originalUrl}/confirm_account/${token}`
        }
        const mailRea = await sendMailByGmail(makeMailBody)
        const sendMailId = mailRea.messageId
        res.send(mailRea)
    } catch (error) {
        console.log(error)
    }
}
module.exports.loginAccount = async (req, res) => {
    try {
        const email = req.body.email
        const password = req.body.password
        if (!email || !password) {
            return res.json({
                status: 'fail',
                massage: "Email and password must required"
            })
        }
        const exist = await USER.findOne({ email })
        const passwordCheck = bcrept.compareSync(password, exist.password)
        if (!passwordCheck) {
            return res.json({
                status: 'fail',
                massage: "Email or password not valid!"
            })
        }
        if (exist.status === 'Blocked') {
            return res.json({
                status: 'fail',
                massage: "User is blocked! please contact with us."
            })
        }
        const token = createToken(exist)
        exist.password = ''
        exist.passwordResetToken = ''
        exist.passwordResetExpires = ''
        res.send({
            user: exist,
            token
        })
    } catch (error) {

    }
}
module.exports.getMyInfo = async (req, res) => {
    try {
        var decoded = req.userInfo
        const result = await USER.findById(decoded._id).select({ password: 0 })
        res.status(200).send(result)
    } catch (err) {
        res.status(401).send({
            status: "token validation failed!",
            error: err,
            massage: err?.massage
        })
    }
}
module.exports.confirmAccount = async (req, res) => {
    try {
        var token = req.params.token
        const result = await USER.findOne({ confirmationToken: token })
        if (!result) {
            return res.json({
                status: "Auth token missing",
                massage: "Authentication token missing"
            })
        }
        if (result.confirmationTokenExpire < new Date()) {
            return res.json({ massage: "Confirmation token expier try again!" })
        } else {
            result.status = "Active"
            result.confirmationToken = undefined
            result.confirmationTokenExpire = undefined
            result.save({ validateBeforeSave: false })
            return res.json({ massage: "Account confirmed successfuly" })
        }
    } catch (err) {
        console.log(err)
        res.status(401).send({
            status: "token validation failed!",
            error: err,
            massage: err
        })
    }
}
module.exports.resetPassword = async (req, res) => {
    try {
        const old_pass = req.body.oldPassword
        const new_pass = req.body.newPassword
        const userId = req.params.userId
        if (!old_pass || !new_pass) {
            return res.status(401).send({
                status: "reset failed",
                error: (old_pass ? "New" : "Old") + " Password missing"
            })
        }
        const user = await USER.findById(userId)
        let matchPassword = bcrept.compareSync(old_pass, user.password)
        if (matchPassword) {
            user.passwordHashed(new_pass)
            user.lastPasswordChange = new Date()
            user.save({ validateBeforeSave: false })
            return res.send({
                status: "new password saved successfully"
            })
        } else {
            return res.send({
                status: "password dosen't save"
            })
        }


    } catch (err) {
        console.log(err)
        res.status(401).send({
            status: "reset failed",
            error: err,
            massage: err
        })
    }
}


//user curd point
module.exports.getAllUser = async (req, res) => {
    try {
        const result = await USER.find()
        res.send(result)
    } catch (error) {

    }
}
module.exports.getAUser = async (req, res) => {
    try {
        const userId = req.params.userId
        const find = await USER.findById(userId)
        res.send(find)
    } catch (error) {

    }
}
module.exports.createAUser = async (req, res) => {
    try {
        let data = new Object({ ...(req.body), ...(uploadImage(req?.files)) })
        const result = await USER.create(data)
        res.send(result)
    } catch (error) {
        const img = uploadImage(req?.files)?.photo
        if (img) {
            deleteImage(img)
        }
        res.status(500).send(error)
    }
}
module.exports.deleteAUser = async (req, res) => {
    try {
        const userId = req.params.userId
        const deleteUser = await USER.findByIdAndDelete(userId)
        if (deleteUser) {
            deleteImage(deleteUser.photo)
        }
        res.send('Delete succesfully')

    } catch (error) {
        console.log(error)

    }
}
module.exports.updateUser = async (req, res) => {
    try {
        const userId = req.params.userId
        let media = (getAllValueFromDocument({ ...(uploadImage(req?.files)) })).filter(img => img.startsWith(`uploads\\`))

        let newState;
        if (media?.length > 0) {
            newState = new Object({ ...(req.body), photo: media[0] })
        }
        else {
            newState = new Object({ ...(req.body) })
        }
        const updated = await USER.findByIdAndUpdate(userId, newState).lean()
        if (media?.length > 0) {
            console.log(updated)
            await deleteImage(updated.photo)
        }
        res.send(updated)
    } catch (error) {
        console.log(error)

    }
}