const {signupSchema,updateSchema} = require('../inputValidation');

const USER = require('../model/userSchema');
const ACCOUNT = require('../model/accountSchema');

const {generateToken,jwtAuthMiddleware}=require('../middleware/jwt');

async function signUpHandler(req,res){

    const data=req.body;
    

    const result=signupSchema.safeParse(data);

    if(!(result.success)){
        console.log(result.error);
        res.status(411).json({message:"Data is invalid"});
    }
    
    const isExist=await USER.findOne({userName:data.userName});

    if(isExist){
        res.status(411).json({message:"UserName already taken"});
    }

    const newUser=new USER(data);
    await newUser.save();

    const account=new ACCOUNT({userId:newUser._id,balance:Math.floor(Math.random()*10001)});

    await account.save();

    const jwt=generateToken(newUser._id);

    res.status(200).json({
        message: "User created successfully",
        token:jwt
    });

}

async function signInHandler(req,res){
    const data=req.body;

    const user=await USER.findOne({userName:data.userName});
    if(!user) res.status(411).json({message:"User not found"});

    if(!(user.password===data.password)) res.status(411).json({message:"Invalid credentials"});

    const jwt=generateToken(user._id);

    res.status(200).json({token:jwt});

}

async function updateHandler(req,res){
     const username=req.user.userId;

     const data=req.body;
     
     const result=updateSchema.safeParse(data);
     if(!(result.success)){
        return res.status(411).json({ message: "Invalid data", errors: result.error.errors });
     }

    await USER.findOneAndUpdate({userName:username},data);
    
    res.status(200).json({message:"User updated successfully"});

}

async function filterHandler(req,res){
    const userId=req.user.userId;
    const filter=req.query.filter;
    
    let users=await USER.find({
        $or:[
            {firstName:{$regex:filter}},
            {lastName:{$regex:filter}}
        ]
    })
   
    users=users.map((user)=>{
        return {firstName:user.firstName,lastName:user.lastName,_id:user._id};
    })
    
    users=users.filter((user)=>{
        return (user._id.toString() != userId)
       
    })

    res.status(200).json({users});

}

module.exports={signUpHandler,signInHandler,updateHandler,filterHandler};