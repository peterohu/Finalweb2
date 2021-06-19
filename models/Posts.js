const mongoose = require('mongoose')
const Post = new mongoose.Schema({
    post: {
        type: String,
        required: true
    },
    createAt: {
        type: Date,
        default: new Date().getTime()
    },
    user: {
        type: String,
        required: true
    }
})
module.exports = mongoose.model('Post',Post)