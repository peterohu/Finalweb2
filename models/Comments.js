const mongoose = require('mongoose')
const Comment = new mongoose.Schema({
    comment: {
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
    },
    postID: {
        type: String,
        required: true
    }
})
const Comments = mongoose.model('Comment',Comment)
module.exports = Comments