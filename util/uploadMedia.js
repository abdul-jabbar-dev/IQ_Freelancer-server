const fs = require('fs')
const getAllValue = (nonPreme) => {
    const d = []
    const getValue = (data) => {
        if (Array.isArray(data)) {
            data.forEach(i => getValue(i))
        } else if (typeof (data) === 'object') {
            let ue = new Object(data)
            getValue(Object.values(ue))
        } else {
            d.push(data)
            return
        }
    }
    getValue(nonPreme)
    return d
}

module.exports.uploadImage = (mediaObject) => {
    if (mediaObject.length === 0) {
        return ''
    }
    let fields = [...new Set(mediaObject.map(obj => obj.fieldname))]

    if (fields.length > 1) {
        let newArrau = [];
        mediaObject.filter(obj => {

            newArrau.push(obj.path) 
        })
        return newArrau
    } else {

        return { [mediaObject[0].fieldname]: mediaObject.length > 1 ? mediaObject?.map(element => element?.path) : mediaObject[0].path }
    }
}
module.exports.deleteImage = async (deletedObj) => {
    try {
        const allImages = getAllValue(deletedObj)
        allImages.forEach(img => fs.exists('./' + img, function (exists) {
            if (exists) {
                console.log('File exists. Deleting now ...');
                fs.unlinkSync('./' + img);
            } else {
                console.log('File not found, so not deleting.');
            }
        }))
    }
    catch (e) {
        if (e) {
            throw e.message
        }
    }

}

module.exports.getAllValueFromDocument = getAllValue