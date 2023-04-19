const validator = require('validator');
const mongoose = require("mongoose");
const bcrept = require('bcrypt')

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
    password: {
        type: String,
    },
    passwordResetToken: String,
    passwordResetExpires: Date
}, { timestamps: true })

userSchema.pre('save', function (next) {
    this.password = bcrept.hashSync(this.password, parseInt(process.env.SALT))
    next()

})
userSchema.methods.comparePassword = function (clientPassword, storedPasswordHash) {
    return bcrept.compareSync(clientPassword, storedPasswordHash)
}

const USER = mongoose.model('users', userSchema)
module.exports = USER