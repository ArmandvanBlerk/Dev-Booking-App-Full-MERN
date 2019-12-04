const router = require('express').Router()
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const passport = require('passport');


// user model
const User = require('../models/User');

router.get('/google', passport.authenticate('google', {scope: ['profile']}));
//This path must match the redirect URI configured on Google's Developer console for this app
router.get('/google/callback', passport.authenticate('google'), (req, res) => {
    
    res.redirect('/');
});





//protected route
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password")
        res.json(user)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})


// POST request to verify whether user allready exists
router.post('/',
[
    check('email', 'Please provide a valid email').isEmail(),
    check('password', 'Please provide a 6 character password').exists()
],
 async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({error: errors.array()})
    }
    
    const { email, password } = req.body
    try {
        let user = await User.findOne({email})
        if(!user){
            return res.status(400).json({msg:'Invalid Credentials'})
        }
        const match = await bcrypt.compare(password, user.password)
        if(!match){
            return res.status(400).json({msg:'Invalid Credentials'})
        }


       const payload = {
           user: {
               id: user.id
           }
       }
       jwt.sign(payload, process.env.SECRET, {
           expiresIn: 3600
       }, (err, token)=> {
           if(err) throw err
           res.send({token})
       })
    }catch (err) {
        console.error(err.message)
        res.status(500).send('Server error')
    }
})



module.exports = router