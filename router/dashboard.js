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
        comments = data
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
        return res.render('dashboard',{user: data, posts: posts, comments: comments, messages: message})
    })
})
router.get('/:user', (req, res) => {
    if(!req.session._id) {
        return res.redirect('/login')
    }
    let posts = undefined
    let comments = undefined
    let message = undefined
    Comments.find()
    .then(data => {
        comments = data
    })
    Posts.find({user: req.params.user})
    .then(data => {
        posts = data
    })
    Messages.find()
    .then(data => {
        message = data
    })
    Accounts.findOne({_id: req.session._id}, function (e, data) {
        return res.render('personal',{user: data, posts: posts, comments: comments, messages: message})
    })
})
router.post('/posted' , (req , res)=>{
    // if(!req.session._id) {
    //     return res.redirect('/login')
    // }
    let content = req.body.content
    console.log(req.session.fullname)
    Accounts.findOne({_id: req.session._id}, function(e, data) {
        let newpost = new Posts({
            post: content,
            user: req.session.fullname
        })
        newpost.save()
    })
    .then(data => {
        return res.redirect('/dashboard')
    })
})
//Xong
router.post('/deletePost/:id' , (req , res)=>{
    if(!req.session._id) {
        return res.redirect('/login')
    }
   let id = req.params.id
   Posts.findByIdAndDelete({_id: id})
   .then(data => {
       return res.redirect('/dashboard')
   })

})
//Chua Xong
router.post('/updatePost/:id', (req, res) => {
    if(!req.session._id) {
        return res.redirect('/login')
    }
   let id = req.params.id
   let content = req.body.content
   Posts.findByIdAndUpdate({_id: id}, {$set: {post: content}})
   .then(data => {
       console.log(data)
       return res.redirect('/dashboard')
   })
})
//------------------------------------------------DONE-------------------------------------------------
router.post('/comment', (req, res) => {
    if(!req.session._id) {
        return res.redirect('/login')
    }
    let {comment, postID} = req.body
    if(!comment || !postID) {
        return res.redirect('/dashboard')
    }
    let comments = new Comments({
        comment: comment,
        user: req.session.fullname,
        postID: postID
    })
    comments.save()
    return res.redirect('/dashboard')
})
//Xong
router.post('/comment/delete/:id', (req, res) => {
    if(!req.session._id) {
        return res.redirect('/login')
    }
    let id = req.params.id
    Comments.deleteOne({_id: id})
    .then(data => {
        return res.redirect('/dashboard')
    })
})
router.post('/postMessage' , (req , res)=>{
    // if(!req.session._id) {
    //     return res.redirect('/login')
    // }
    let {message,falcuty,title} = req.body
    if(!message || !falcuty || !title) {
        return res.redirect('/dashboard')
    }
    console.log(req.body)
     let newMessage = new Messages({
         title: title,
         message: message,
         user: req.session.fullname,
         falcuty: falcuty
     })
     newMessage.save()
     return res.redirect('/dashboard')
 })

module.exports = router