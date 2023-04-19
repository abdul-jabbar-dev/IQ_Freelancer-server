const USER = require("../Schema/user.schema")
const createToken = require("../util/createToken")
const bcrept = require("bcrypt")
const { uploadImage, deleteImage, getAllValueFromDocument } = require("../util/uploadMedia")
const jwt = require("jsonwebtoken")

// authentication point
module.exports.registerAAccount = async (req, res) => {
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
    res.send(result)
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
        var decoded = jwt.verify(req.jwt_token, process.env.JWT_SECRET);
        res.status(200).send(decoded)
    } catch (err) {
        res.status(401).send({
            status:"token validation failed!",
            error:err,
            massage:err?.massage

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