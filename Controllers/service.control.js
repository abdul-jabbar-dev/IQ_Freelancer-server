const SERVICE = require("../Schema/service.schema")
const { uploadImage } = require("../util/uploadMedia")

module.exports.getAllService = async (req, res) => {
    try {
        const result = await SERVICE.find().populate('reviews')
        res.status(200).send(result)
    } catch (error) {
        console.log(error)
    }
}

module.exports.postAService = async (req, res) => {
    try {
        let data = new Object({ ...(req.body), media: { ...(uploadImage(req?.files)) } })
        const result = await SERVICE.create(data)
        res.status(200).send(result)
    } catch (error) {
        console.log(error)
    }
}