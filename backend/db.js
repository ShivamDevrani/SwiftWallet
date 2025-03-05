const mongoose=require('mongoose');

mongoose.connect(process.env.mongoDB);

const db=mongoose.connection;


db.on('connected',()=>{
    console.log('mongodb is connected');
})

db.on('disconnected',()=>{
    console.log('mongodb is disconnected');
    
})

db.on('error',(err)=>{
    console.log(err);
}) ;


module.exports=db;