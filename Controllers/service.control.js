const SERVICE = require("../Schema/service.schema")
const { uploadImage, deleteImage } = require("../util/uploadMedia")

module.exports.getAllService = async (req, res) => {
    try {
        const result = await SERVICE.find().populate('reviews')
        res.status(200).send(result)
    } catch (error) {
        console.log(error)
    }
}

module.exports.updateAService = async (req, res) => {
    try {
        const result = await SERVICE.find().populate('reviews')
        res.status(200).send(result)
    } catch (error) {
        console.log(error)
    }
}

module.exports.postAService = async (req, res) => {
    try {
        let data = new Object({ ...(req.body), ...(uploadImage(req?.files))  })
        const result = await SERVICE.create(data)
        console.log(result)
        res.status(200).send(result)
    } catch (error) {
        console.log(error)
    }
}
module.exports.deleteAService = async (req, res) => {
    try { // not use into commant box
        const serviceId = req.params.serviceId
        const result = await SERVICE.findByIdAndDelete(serviceId)
        if (result.images){
            deleteImage(result.images)
        }
        res.status(200).send(result)
    } catch (error) {
        console.log(error)
    }
}