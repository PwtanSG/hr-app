const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name:{
        type: String,
        require: [true, 'Name is requried']
    },
    email:{
        type: String,
        require: [true, 'Email is requried'],
        unique: true
    },
    password:{
        type:String,
        require:[true, 'Password is requried']
    }
},{
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)