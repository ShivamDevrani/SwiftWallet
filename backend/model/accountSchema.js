const mongoose=require('mongoose');

const accountSchema =new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'USER'
    },
    balance:{
        type:Number,
    }
})


const ACCOUNT=mongoose.model('ACCOUNT',accountSchema);

module.exports=ACCOUNT;