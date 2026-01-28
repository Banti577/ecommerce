const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
            trim: true,
            lowercase: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            lowercase: true
        },
        gender: {
            type: String,
            enum: ['male', 'female', 'Other'],
            required: true,
        },
        password: {
            type: String,
            minlength: 8,
            required: true,
        },
        profileImg: {
            type: String,
            default: 'dsbfjdsbfjsdafjsdaf'

        },
        dateOfBirth: {
            type: Date
        },
        role: {
            type: String,
            enum: ['user', 'seller', 'admin'],
            default: 'user',
        },
        address: {
            type: String,

        },
        products: {
            type: mongoose.Schema.ObjectId,
            ref: 'product'
        }
    }, { timestamps: true }
)

module.exports = mongoose.model('user', userSchema);