const REVIEW = require("../Schema/reviews.schema")
const SERVICE = require("../Schema/service.schema")

module.exports.postAServiceReview = async (req, res) => {
    try {
        if (req.params.serviceId && req.body.userId) {
            const data = {
                serviceId: req.params.serviceId,
                userId: req.body.userId,
                ratting: req.body.ratting,
                review: req.body.review,
            }
            const result = await REVIEW.create(data)
            if (result._id) {
                const updated = await SERVICE.updateOne({ _id: data.serviceId }, { $push: { reviews: result._id } })
                console.log(updated)
            }
            res.status(200).send(result)

        }
    } catch (error) {
        console.log(error)
    }
}

module.exports.deleteAServiceReview = async (req, res) => {
    try {
        const reviewId = req.params.reviewId
        if (reviewId) {
            const findReview = await REVIEW.findByIdAndDelete(reviewId)
            const findService = await SERVICE.findOneAndUpdate({ _id: findReview.serviceId }, {
                $pull: {
                    reviews: findReview._id
                }
            })
            res.send(findService)
        }
    } catch (error) {
        console.log(error)
    }
} 