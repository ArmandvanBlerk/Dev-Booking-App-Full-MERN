const mongoose = require('mongoose')

const guestSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    projectscope: {
        type: String,
        required: true,
        default: 'Web-Dev'
    },
    isconfirmed: {
        type: Boolean,
        default: false
    }
})



module.exports = mongoose.model('guest', guestSchema)