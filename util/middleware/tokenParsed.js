const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
    const bearerRoken = req?.headers?.authorization
    if (!bearerRoken) {
        return res.status(401).json(
            {
                status: "Authorization failed",
                massage: "Login Required! "
            }
        )
    }
    const token = bearerRoken.split(' ')[1]
    try {
        req.userInfo = jwt.verify(token, process.env.JWT_SECRET);
        next()
    } catch (error) {
        return res.send({ error, tips: "Try valid token" })
    }


}