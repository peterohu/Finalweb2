const express = require('express')
const router = express.Router()

const Posts = require('../models/Posts')
const Comments = require('../models/Comments')
const Accounts = require('../models/Accounts')
const Messages = require('../models/Messages')

router.get('/' , (req , res)=>{

    if(!req.session._id) {
        return res.redirect('/login')
    }
    let posts = undefined
    let comments = undefined
    let message = undefined
    Comments.find()
    .then(data => {
        comments = comments
    })
    Posts.find()
    .then(data => {
        posts = data
    })
    Messages.find()
    .then(data => {
        message = data
    })
    Accounts.findOne({_id: req.session._id}, function (e, data) {
        return res.render('allmessage',{user: data, posts: posts, comments: comments, messages: message})
    })
})
router.post('/deleteMessages/:id' , (req , res)=>{
    if(!req.session._id) {
        return res.redirect('/login')
    }
   let id = req.params.id
   Messages.deleteOne({_id: id})
   .then(data => {
       return res.redirect('/messages')
   })
})
router.post('/updateMessages/:id', (req, res) => {
    if(!req.session._id) {
        return res.redirect('/login')
    }
    let {message,title,falcuty} = req.body
    let id = req.params.id
    Messages.findByIdAndUpdate({_id: id}, {$set: {
        title: title,
        message: message,
        falcuty: falcuty
    }})
    .then(data => {
        return res.redirect('/messages/'+id)
    })
})
router.get('/:id' , (req , res)=>{
    if(!req.session._id) {
        return res.redirect('/login')
    }
    let message = undefined
    Messages.findOne({_id: req.params.id})
    .then(data => {
        message = data
    })
    Accounts.findOne({_id: req.session._id}, function (e, data) {
        return res.render('messagedetail',{user: data, messages: message})
    })
})

module.exports = router