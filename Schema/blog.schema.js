const mongoose = require('mongoose')
const commentsSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    content: {
        type: String,
        trim: true,
    },
    blog: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'blogs'
    },
    replay: []
})
const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Blog title required '],
    },
    content: {
        type: String,
        required: [true, 'Blog content required '],
    },
    thumbnail: {
        type: String
    },
    tags: {
        type: [String],
        required: [true, 'Blog tags required '],
    },
    status: {
        type: String,
        enum: ['Active', 'Deactive'],
        default: 'Active',
    },
    views: {
        type: Number,
        default: 0
    },
    like: {
        type: Number,
        default: 0
    },
    comments: {
        type: [commentsSchema]
    }
})


const BLOG = mongoose.model('blogs', blogSchema)
module.exports = BLOG