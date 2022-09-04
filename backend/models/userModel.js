const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    staff_no:{
        type: String,
        required: [true, 'Staff No. is requried'],
    },
    name:{
        type: String,
        required: [true, 'Name is requried'],
    },
    email:{
        type: String,
        required: [true, 'Email is requried'],
        unique: true,
    },
    gender:{
        type: String,
        required: [true, 'Gender is requried'],
    },
    address:{
        type: String,
        required: [true, 'Address is requried'],
        // required: function() { return this.a === 'test'; } 
    },
    designation:{
        type: String,
        required: [true, 'designation is requried'],
        // required: function() { return this.a === 'test'; } 
    },
    is_admin:{
        type: Boolean,
        default: false,
        required: [true, 'Admin is required']
    },
    password:{
        type:String,
        required:[true, 'Password is requried'],
    }
},{
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)