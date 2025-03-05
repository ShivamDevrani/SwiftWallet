const mongoose=require('mongoose'); 
const { union } = require('zod');

const userSchema=new mongoose.Schema({
    userName:{
        type:String,
        required:true,
        trim:true,
        lowerCase:true,
        unique:true,
        minLength:3,
        maxLength:30
    },
    password:{
        type:String,
        required:true,
        minLength:6,
    },
    firstName:{
        type:String,
        required:true,
        maxLength:50
    },
    lastName:{
        type:String,
        required:true,
        maxLength:50,
        trim:true
    },
})

const USER=mongoose.model('USER',userSchema);

module.exports=USER;