
module.exports.uploadImage = (mediaObject) => {
    if(mediaObject.length===0){
        return ''
    }
    let fields = [...new Set(mediaObject.map(obj => obj.fieldname))]

    if (fields.length > 1) {
        let newArrau = Object.create({});
        mediaObject.filter(obj => {
            if (newArrau[obj.fieldname] !== undefined) {
                newArrau[obj.fieldname] = [newArrau[obj.fieldname]]
                newArrau[obj.fieldname].push(obj.path)
            } else {
                newArrau[obj.fieldname] = obj.path
            }
        })
        return newArrau
    } else {

        return { [mediaObject[0].fieldname]: mediaObject.length > 1 ? mediaObject?.map(element => element?.path) : mediaObject[0].path }
    }
}