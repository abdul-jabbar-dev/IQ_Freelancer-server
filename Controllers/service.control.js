const SERVICE = require("../Schema/SERVICE.schema")
const { uploadImage } = require("../util/uploadMedia")


module.exports.getAllService = async (req, res) => {
    const result = await SERVICE.find()
    console.log(result)
}


module.exports.postAService = async (req, res) => {
    try {
        let data = new Object({ ...(req.body), ...(uploadImage(req?.files)) })
        const result = await SERVICE.create(data)
        res.status(200).send(result)
    } catch (error) {
        console.log(error)
    }
}