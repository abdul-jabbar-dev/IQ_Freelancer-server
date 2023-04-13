const USER = require("../Schema/user.schema")
const { uploadImage } = require("../util/uploadMedia")
module.exports.getAllUser = async (req, res) => {
    try {
        const result = await USER.find()
        res.send(result)
    } catch (error) {

    }
}
module.exports.createAUser = async (req, res) => {
    try {
        let data = new Object({ ...(req.body), media: { ...(uploadImage(req?.files)) } })
        console.log(data)
        const result = await USER.create(data)
        res.status(200).send(result)
    } catch (error) {
        console.log(error)
    }
}