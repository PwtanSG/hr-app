const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const protect = asyncHandler (async (req, res, next) => {
    let token
    //get and verify token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            token = req.headers.authorization.split(' ')[1]
            //verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            //get user from token
            req.user = await User.findById(decoded.id).select('-password')
            // console.log('auth middleware')
            // console.log('user',req.user.name)
            //call next middleware
            next()
        } catch (error) {
            res.status(401)
            throw new Error('Not authothrized')
        }
    }
    //no token
    if (!token) {
        res.status(401)
        throw new Error('Not authorized, no token.')
    }
})
module.exports = { protect }