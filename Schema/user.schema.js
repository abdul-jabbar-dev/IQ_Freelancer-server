const validator = require('validator');

const mongoose = require("mongoose");

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

    userName: {
        type: String,
        required: [true, 'Name must required'],

    },
    media: {
        type: { photo: String },
        _id:false 
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
        unique: [true, 'Email already exist!'],
        required: 'Email address is required',
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
    }
}, { timestamps: true })


const USER = mongoose.model('users', userSchema)
module.exports = USER