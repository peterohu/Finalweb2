const mongoose = require('mongoose')
const Account = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String
    },
    role: {
        type: String,
        required: true
    },
    fullname: {
        type: String,
        required: true
    },
    falcuty: {
        type: String
    },
    class: {
        type: String    
    },
    avatar: {
        type: String
    },
})
module.exports = mongoose.model('Account',Account)