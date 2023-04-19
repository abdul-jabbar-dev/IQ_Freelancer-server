const mongoose = require('mongoose')
const { Schema } = mongoose;

const reviewSchema = new mongoose.Schema({

    userId: {
        type: Schema.Types.ObjectId,
        required: [true, 'userId field required '],
    },
    serviceId: {
        type: Schema.Types.ObjectId,
        required: [true, 'serviceId field required '],
    },
    reviewDate: {
        type: Date,
        default: Date.now
    },
    review: {
        type: String,
    },
    ratting: {
        type: Number,
        required: [true, 'ratting field required '],
    }
})


const REVIEW = mongoose.model('reviews', reviewSchema)
module.exports = REVIEW