const express = require('express')
const { getAllBlog, postABlog } = require('../Controllers/Blog.control')
const BlogRoute = express.Router()

BlogRoute
    .get('/', getAllBlog)
    .post('/',postABlog)


module.exports = BlogRoute