const express = require('express')

const { getAllService, postAService } = require('../Controllers/service.control')
const upload = require('../Config/multer')
const { postAServiceReview } = require('../Controllers/review.service.control')
const ServiceRoute = express.Router()

ServiceRoute
    .get('/', getAllService)
    .post('/', upload.any(),postAService)


ServiceRoute.post('/review/:serviceId', postAServiceReview)

module.exports = ServiceRoute