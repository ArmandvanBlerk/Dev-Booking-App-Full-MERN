const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const FacebookStrategy = require('passport-facebook');
const keys = require('../config/index');
const User = require ('../models/GoogleSchema');

passport.serializeUser((user, done) => {
    done(null,user.id);
})
passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
       done(null,user.id); 
    })
    
})

// Google strategy
passport.use(new GoogleStrategy({
    callbackURL: '/auth/google/callback',
    clientID: keys.GOOGLE.clientID,
    clientSecret: keys.GOOGLE.clientSecret
   
},
    (accessToken, refreshToken, profile, done) => {
       User.findOne({googleID: profile.id}).then((currentUser) => {
        if(currentUser){
                console.log('user is ', currentUser)
                done(null, currentUser)
        }else {
            new User({
           name: profile.name,
           googleID: profile.id,
           email: email.value
       }).save().then((newUser) => {
           console.log('new user created' + newUser);
           done(null, newUser)
       }); 
        }
       })
      
       })
)
