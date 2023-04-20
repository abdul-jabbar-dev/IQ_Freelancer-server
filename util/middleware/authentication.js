module.exports = (...role) => (req, res, next) => {
    console.log(req.userInfo)
    if (req.userInfo.status === 'Not Verified') {
        return res.status(401).json({
            status: "Account not Verified",
            massage: "You'll get an email from mail. Open the mail and find the verification code and varified."
        })
    }
    if (role.includes('*') || role.includes(req.userInfo.role)) {
        next()
    } else {
        return res.status(401).json({
            status: "Authorization failed",
            massage: "Login required!"
        })
    }

}