const BLOG = require("../Schema/blog.schema")
const { uploadImage } = require("../util/uploadMedia")

module.exports.getAllBlog = async (req, res) => {
    try {
        const result = await BLOG.find()
        res.send(result)
    } catch (error) {
        res.send(error)
    }
}
module.exports.postABlog = async (req, res) => {
    try {
        let data = new Object({ ...(req.body), ...(uploadImage(req?.files)) })
        const result = await BLOG.create(data)
        res.send(result)
    } catch (error) {
        res.send(error)
    }
}

module.exports.createAComment = async (req, res) => {
    try {
        const blogId = req.params.blogId
        if (req.body.user) {
            const massage = {
                user: req.body.user,
                content: req.body.content,
                replay: []
            }
            const result = await BLOG.findByIdAndUpdate(blogId, {
                $push: {
                    comments: massage
                }
            })
            res.send(result)
        } else {
            throw "User Id required"
        }
    } catch (error) {
        res.send(error)
    }
}

module.exports.createAReplay = async (req, res) => {
    try {
        const blogId = req.params.blogId
        const commentId = req.body.commentId
        const replay = {
            content: req.body.content,
        }
        const result = await BLOG.updateOne({ _id: blogId, "comments._id": commentId },
            {
                $set: { 
                    "comments.$.replay": replay
                }
            })
        console.log(result)
    } catch (error) {
        res.send(error)
    }
}