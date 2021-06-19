const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const passport = require('passport')

const Posts = require('./models/Posts')
const Comments = require('./models/Comments')
const Accounts = require('./models/Accounts')
const Messages = require('./models/Messages')
const app = express()
require('dotenv').config()

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(express.static(__dirname + '/public'))
app.use(session({
    secret: "phucluandoancuoiki",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

require('./googleoauth2')
app.use(passport.initialize());
app.use(passport.session());


app.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    console.log(req.user)
    req.session._id = req.user._id
    req.session.name = req.user.name
    req.session.role = 'student'
    res.redirect('/dashboard')
  } 
)
app.use('/', require('./router/index'))
app.use('/dashboard', require('./router/dashboard'))
app.use('/messages', require('./router/messages'))

mongoose.set('useFindAndModify', false);
mongoose.connect('mongodb://localhost:27017/chouha', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
.then(console.log('CONECTED'))
app.listen(process.env.PORT, () => console.log('http://localhost:'+process.env.PORT))