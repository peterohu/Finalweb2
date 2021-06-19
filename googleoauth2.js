const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const Accounts = require('./models/Accounts')

passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
passport.deserializeUser(function(user, done) {
    done(null, user);
});

passport.use(new GoogleStrategy({
    clientID: "507699291037-5cq14dc7cmca35qfhkrodlr3pq4gda63.apps.googleusercontent.com",
    clientSecret: "mPHeT3h2ZL7Ar1dGfAcAIYQi",
    callbackURL: "http://localhost:9999/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
   if(profile._json.hd == 'student.tdtu.edu.vn') {
    Accounts.findOne({email: profile.emails[0].value}, function(err, data) {
      if(!data) {
        let student = new Accounts({
          fullname: profile.displayName,
          email: profile.emails[0].value,
          role: 'student'
        })
        student.save()
      }
      //console.log(data)
      return done(null, data)
     })
   }else {
     err = 'Please login using TDTU gmail'
     return done(err)
   }
  }
));