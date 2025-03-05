const express = require("express");
const cors=require('cors');
const app=express();
require('dotenv').config()
const db=require('../backend/db');


const userRoutes=require('../backend/routes/userRoutes');
const accountRoutes=require('../backend/routes/accountRoutes');

const errorHandler=require('../backend/middleware/errorHandler');


app.use(cors());
app.use(express.json());

app.use(express.urlencoded({extended:true}));


app.use('/user',userRoutes);
app.use('/account',accountRoutes);

app.use(errorHandler);



app.listen(3000,()=>{
    console.log("Server is running on port 3000");
});
