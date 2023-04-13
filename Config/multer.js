const multer = require('multer')
const path = require('path')
const store = multer.diskStorage({
    destination: function (req, file, cb) {
        
        cb(null, './uploads')
    },
    filename: (req, file, cb) => {
        const { ext, name } = path.parse(file.originalname)
        cb(null, `${name}_${Date.now()}_${ext}`)
    }
})
const uploader = multer({ storage: store })
module.exports = uploader