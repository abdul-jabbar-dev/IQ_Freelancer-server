const mongoose = require('mongoose')
const { Schema } = mongoose;
const serviceSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, 'Name field required '],
        trim: true
    },
    price: {
        type: Number,
        required: [true, 'Price field required '],
        trim: true,
    },
    images: {
        type: [String],
        required: [true, 'Images field required '],
    },
    description: {
        type: String,
        required: [true, 'Description field required '],
        maxlength: [200, 'Maximum length 200 ']
    },
    reviews: {
        type: Schema.Types.ObjectId,
        ref: 'reviews'
    },
    comments: {
        type: String
    }

}, {
    timestamps: true
})

const SERVICE = mongoose.model('services', serviceSchema)
module.exports = SERVICE