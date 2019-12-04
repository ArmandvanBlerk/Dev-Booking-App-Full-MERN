const router = require('express').Router()
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

//Guest Model
const Guest = require('../models/Guest')
//Google model
const googleGuest = require('../models/GoogleSchema')

//Get Request
router.get('/', auth, async (req, res) => {
    try {
        const guests = await Guest.find({user: req.user.id})
        res.json(guests)
    } catch (error) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})

// Google model
router.get('/', auth, async (req, res) => {
    try {
        const googleUser = await googleGuest.find({ User: req.user.id})
        res.json(googleUser)
    } catch (error) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})



//Post Request
router.post('/', auth,  
[
  check('name', 'Please provide name').not().isEmpty(),
  check('email', 'Please provide email').not().isEmpty(),
  check('phone', 'Please provide phone').not().isEmpty(),
  check('description', 'Please provide description').not().isEmpty()
],
  async (req, res) => {
  const errors = validationResult(req)
  if(!errors.isEmpty()){
      return res.status(400).json({error: errors.array() })
  }
    const { 
        name, 
        email, 
        phone, 
        description, 
        projectscope, 
        isconfirmed
    } = req.body
    try {
        let guest = new Guest({
            user: req.user.id,
            name, 
            email, 
            phone, 
            description, 
            projectscope, 
            isconfirmed
        })
        guest = await guest.save()
        res.json(guest)

    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
        
    }
})

//Delete Request
router.delete('/:id', auth, async(req, res) => {
    try {
        let guest = await Guest.findById(req.params.id)
        if(!guest){
            return res.status(404).json({msg: 'Guest not found'})
        }
        await Guest.findByIdAndRemove(req.params.id)
        res.send('Guest removed')

    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server error')
    }
})

//Update Request
router.put('/:id', auth, async(req, res) => {
    const { 
        name, 
        email, 
        phone, 
        description, 
        projectscope, 
        isconfirmed
    } = req.body
    const updatedGuest = {
        name, 
        email, 
        phone, 
        description, 
        projectscope, 
        isconfirmed
    }
    try {
        let guest = await Guest.findById(req.params.id)
        if(!guest){
            return res.status(404).json({msg: 'Guest not found'})
        }
        guest = await Guest.findByIdAndUpdate(req.params.id, {$set: updatedGuest}, {new: true})
        res.send(guest)
        
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')

    }
})


module.exports = router