const multer = require("multer");
const fs = require("fs");
const urlPath = require('path')
exports.upload = (folderName) => {
    return imageUpload = multer({
        storage: multer.diskStorage({
            destination: function (req, file, cb) {
                const path = `./uploads/${folderName}/`;
                fs.mkdirSync(path, { recursive: true })
                cb(null, path);
            },
            filename: function (req, file, cb) {
                let filePath = urlPath.parse(file.originalname)
                cb(null, filePath.name + '_' + Date.now() + '_' + filePath.ext);
            }
        }),
        limits: { fileSize: 10000000 },
        fileFilter: function (req, file, cb) {
            if (!file.originalname.match(/\.(jpg|JPG|webp|jpeg|JPEG|png|PNG||jfif|JFIF)$/)) {
                req.fileValidationError = ' Only jpg|webp|jpeg|png|jfif files are allowed!';
                return cb(null, false);
            }
            cb(null, true);
        }
    })
}