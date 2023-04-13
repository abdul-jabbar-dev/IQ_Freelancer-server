const express = require('express')
const { getAllUser, createAUser } = require('../Controllers/user.control')
const { upload } = require('../Config/multer')
const UserRoute = express.Router()

UserRoute
    .get('/', getAllUser)
    .post('/', upload('user').any(), createAUser)


module.exports = UserRoute