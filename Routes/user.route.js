const express = require('express') 
const { getAllUser, createAUser, deleteAUser, updateUser, getAUser, registerAAccount, loginAccount, getMyInfo } = require('../Controllers/user.control')
const { upload } = require('../Config/multer')
const  tokenParsed  = require('../util/middleware/tokenParsed')
const UserRoute = express.Router()

UserRoute
    .get('/', getAllUser)
    .get('/getme', tokenParsed, getMyInfo)
    .post('/register', registerAAccount)
    .post('/login', loginAccount)
    
    .post('/', upload('user').any(), createAUser)
    .get('/:userId', getAUser)
    .put('/:userId', upload('user').any(), updateUser)
    .delete('/:userId', deleteAUser)


module.exports = UserRoute