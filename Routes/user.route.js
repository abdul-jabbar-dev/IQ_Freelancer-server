const express = require('express')
const {
    getAllUser,
    createAUser,
    deleteAUser,
    updateUser,
    changePassword,
    getAUser,
    registerAAccount,
    loginAccount,
    getMyInfo,
    resetPassword,
    confirmResetPassword,
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

    .post('/change_password/:userId', changePassword)
    .post('/reset_password', resetPassword)
    .post('/reset_password/confirm/:email', confirmResetPassword)

    .post('/', upload('user').any(), createAUser)
    .get('/:userId', getAUser)
    .put('/:userId', upload('user').any(), updateUser)
    .delete('/:userId', deleteAUser)


module.exports = UserRoute