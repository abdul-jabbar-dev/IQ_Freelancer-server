const express = require('express')
const {
    getAllUser,
    createAUser,
    deleteAUser,
    updateUser,
    resetPassword,
    getAUser,
    registerAAccount,
    loginAccount,
    getMyInfo,
    confirmAccount
} = require('../Controllers/user.control')
const { upload } = require('../Config/multer')
const tokenParsed = require('../util/middleware/tokenParsed')
const authentication = require('../util/middleware/authentication')
const UserRoute = express.Router()

UserRoute
    .get('/', getAllUser)
    .get('/getme', tokenParsed, authentication('*'), getMyInfo)
    .get('/register/confirm_account/:token', confirmAccount)
    .post('/register', registerAAccount)
    .post('/login', loginAccount)

    .post('/reset_password/:userId', resetPassword)

    .post('/', upload('user').any(), createAUser)
    .get('/:userId', getAUser)
    .put('/:userId', upload('user').any(), updateUser)
    .delete('/:userId', deleteAUser)


module.exports = UserRoute