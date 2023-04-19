const express = require('express')
const { getAllBlog, postABlog, createAComment, createAReplay } = require('../Controllers/Blog.control')
const { upload } = require('../Config/multer')
const BlogRoute = express.Router()

BlogRoute
    .get('/', getAllBlog)
    .post('/', upload('blog').any(),postABlog)

BlogRoute
    // .get('/', getAllBlog)
    .post('/comment/:blogId',createAComment)


BlogRoute
    // .get('/', getAllBlog)
    .post('/replay/:blogId',createAReplay)


module.exports = BlogRoute