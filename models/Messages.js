const mongoose = require('mongoose')
const Message = new mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    createAt: {
        type: Date,
        default: new Date().getTime()
    },
    falcuty: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    }
})
module.exports = mongoose.model('Message',Message)