const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const listUsers = asyncHandler(async (req, res) => {
    try {
        const list = await User.find().select('-password')
        if(list){
            res.status(200).json(list)
        }else{
            res.status(200).json({message: "no data found."})
        }
    } catch (error) {
        res.status(400)
        throw new Error('Error getting users.')
    }

})


const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body
    // Validate
    if (!name || !email || !password){
        res.status(400)
        throw new Error('Please add all fields')
    }
    const userExits = await User.findOne({email})
    if (userExits){
        res.status(400)
        throw new Error('User already exist.')
    }
    //hash password
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)
    const user = await User.create({
        name,
        email,
        password: hashPassword
    })
    if(user){
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email
        })
    } else {
        res.status(400)
        throw new Error('User registration fails')
    }
})

const loginUser = asyncHandler(async (req, res) => {
    const { email, password} = req.body
    const user = await User.findOne({email})
    if(user && (await bcrypt.compare(password, user.password))){
        res.status(200).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)

        })
    } else {
        res.status(200)
        throw new Error('Invalid credential')
    }
})

const getMe = asyncHandler(async (req, res) => {
    const { _id, name, email } = await User.findById(req.user.id)
    res.status(200).json({
            id: _id,
            name,
            email,
    })
})

const generateToken = (id) => {
    return jwt.sign(
        { id },
        process.env.JWT_SECRET,
        { expiresIn: 3600} //1 hr
    )
}

module.exports = {
    registerUser,
    loginUser,
    getMe,
    listUsers
}