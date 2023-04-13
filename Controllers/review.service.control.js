
module.exports.postAServiceReview = async (req, res) => {
    try {
        if (req.params.serviceId) {
            const data = {
                serviceId: req.params.serviceId,
                userId: req.body.userid,
                ratting: req.body.ratting,
                review: req.body.review,
            }
            console.log(data)
        }
    } catch (error) {
        console.log(error)
    }
}