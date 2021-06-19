const express = require('express')
const router = express.Router()

const Accounts = require('../models/Accounts')

router.get('/', (req, res) => {
    return res.redirect('/login')
})

router.get('/login', (req, res) => {
    return res.render('loginpage')
})
router.get('/logout', (req, res) => {
    req.session.destroy()
    return res.redirect('/login')
})
router.post('/login' , (req , res)=>{

    let {email, password} = req.body
    Accounts.findOne({email: email})
    .then(data => {
        if(!data) {
            console.log(data)
            return res.json('Invalid email')
        }
        //console.log(data)
        if(password == data.password) {
             req.session._id = data._id
             req.session.fullname = data.fullname
             req.session.role = data.role
             console.log(req.session)
             return res.redirect('/dashboard')
        }
        else {
             return res.json('Invalid password')
        }
    })
 
 })
router.post('/addUser', (req, res) => {
    // if(!req.session._id) {
    //     return res.redirect('/login')
    // }
    console.log(req.body)
    let {email, password, fullname, falcuty, role} = req.body
    if(!email || !password || !fullname || !falcuty || !role) {
        return res.json('Fill all the field to continues')
    }
    Accounts.findOne({email: email})
    .then(data => {
        if(data) {
            return res.send('This email already has account')
        }
        let addUser = new Accounts({
            email: email,
            password: password,
            fullname: fullname,
            falcuty: falcuty,
            role: role
        })
        return addUser.save()
    })
    .then(() => {
        return res.redirect('/dashboard')
        //return res.redirect('/newsfeed')
    })
})
router.post('/updatePassword' , (req , res)=>{
    if(!req.session._id) {
        return res.redirect('/login')
    }
   let {password, newpassword} = req.body
   Accounts.findOne({_id: req.session._id})
    .then(data => {
        if(password == data.password) {
            Accounts.findByIdAndUpdate({_id: req.session._id}, {$set: {
                password: newpassword
                }})
                .then(data => {
                    return res.redirect('/dashboard')
                })
        }
        else {
             return res.json({code: 1, message: 'Wrong password'})
        }
    })
   

})

router.post('/updateUser' , (req , res)=>{
    if(!req.session._id) {
        return res.redirect('/login')
    }
   let {name, inclass, falcuty, avatar} = req.body
   Accounts.findByIdAndUpdate({_id: req.session._id}, {$set: {
       name: name,
       class: inclass,
       falcuty: falcuty,
       avatar: avatar
   }})
   .then(data => {
       console.log(data)
       return res.redirect('/dashboard')
   })
})

module.exports = router