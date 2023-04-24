const validator = require('validator');
const mongoose = require("mongoose");
const bcrept = require('bcrypt')
const crypto = require('crypto')

const addressSchema = new mongoose.Schema({
    street: String,
    city: String,
    country: String,
})

const socialLinksSchema = new mongoose.Schema({
    facebook: String,
    github: String,
    linkedin: String,
    twitter: String,
    instagram: String,
})

const userSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: [true, 'First Name must required'],

    },
    lastName: {
        type: String,
        required: [true, 'Last Name must required'],

    },
    photo: {
        type: String
    },
    email: {
        type: String,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email',
            isAsync: false
        },
        lowercase: true,
        trim: true,
        required: [true, 'Email must required!'],
        unique: [true, 'Email already exist!'],
    },
    status: {
        type: String,
        enum: ['Active', 'Deactive', 'Not Verified', 'Blocked'],
        default: 'Not Verified'
    },
    role: {
        type: String,
        lowercase: true,
        trim: true,
        enum: ['subscriber', 'admin'],
        default: 'subscriber'
    },
    address: {
        type: addressSchema
    },
    phoneNumer: {
        type: String,
        trim: true,
    },
    gender: {
        type: String,
        enum: {
            values: ['Male', 'Female'],
            message: 'Gender Male or Female accepted'
        }
    },
    socialLinks: {
        type: socialLinksSchema
    },
    password: String ,
    lastPasswordChange: Date,
    confirmationToken: String,
    confirmationTokenExpire: Date,
    passwordSecretCode: String,
    passwordSecretCodeExpire: Date
}, { timestamps: true })

userSchema.methods.passwordHashed = function (newPassword = this.password) {
    this.password = bcrept.hashSync(newPassword, parseInt(process.env.SALT))
    return this.password
}

userSchema.methods.comparePassword = function (textAsText, storedPasswordAsHash) {

    return bcrept.compareSync(textAsText, storedPasswordAsHash)
}

userSchema.methods.genarateConfirmationToken = function () {

    let token = crypto.randomBytes(32).toString('hex')
    this.confirmationToken = token
    let date = new Date()
    date.setDate(date.getDate() + 1)
    this.confirmationTokenExpire = date
    return token
    
}

userSchema.methods.genaratePasswordSecretCode = function () {

    let secretCode = Math.floor((Math.random() * 1000000) + 1);
    this.passwordSecretCode = secretCode
    let date = new Date()
    date.setDate(date.getDate() + 1)
    this.passwordSecretCodeExpire = date
    return secretCode

}

const USER = mongoose.model('users', userSchema)
module.exports = USER