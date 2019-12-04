require('dotenv').config()
const jwt = require('jsonwebtoken')

//middleware for protected routes
const auth = (req, res, next) => {
    const token = req.header('auth-token')
    if(!token){
        return res.status(401).json({msg:'NO Token Access Denied'})
    }
    try {
       const decoded = jwt.verify(token, process.env.SECRET) 
       req.user = decoded.user
       next()
    } catch (error) {
        res.status(401).json({msg:'Invalid Token'})
    }
}

module.exports = auth