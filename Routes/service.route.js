const express = require('express')

const { getAllService, postAService, deleteAService } = require('../Controllers/service.control')
const { postAServiceReview, deleteAServiceReview } = require('../Controllers/review.service.control')
const { upload } = require('../Config/multer')
const ServiceRoute = express.Router()

ServiceRoute
    .get('/', getAllService)
    .post('/', upload('service').any(), postAService)
    .delete('/:serviceId',deleteAService)
    // .put('/:serviceId', upload('service').any(),updateAService)


ServiceRoute
    .post('/review/:serviceId', postAServiceReview)
    .delete('/review/:reviewId', deleteAServiceReview)

module.exports = ServiceRoute