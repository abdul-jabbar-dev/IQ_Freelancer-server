module.exports = async (req, res, next) => {
    const bearerRoken = req?.headers?.authorization
    if (!bearerRoken) {
        return res.status(401).json(
            {
                status: "Authorization faild",
                massage: "Auth Token missing! "
            }
        )
    }
    const token = bearerRoken.split(' ')[1]
    req.jwt_token = token
    next()
}