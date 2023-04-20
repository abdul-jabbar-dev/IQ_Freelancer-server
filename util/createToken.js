const jwt = require("jsonwebtoken")

module.exports = createToken = (userInfo) => {
    const user = {
        status:userInfo.status,
        _id: userInfo._id,
        email: userInfo.email,
        role: userInfo.role
    }
    return jwt.sign(user, process.env.JWT_SECRET)
}