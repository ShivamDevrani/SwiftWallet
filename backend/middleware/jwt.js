
const jwt=require('jsonwebtoken');

const jwtSecret='1121';

const generateToken=(userId)=>{
    return jwt.sign({userId},jwtSecret);
}

const jwtAuthMiddleware=(req,res,next)=>{
    try{
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(403).json({message:"unauthorised token"});
        }
        
        const token = authHeader.split(' ')[1];
        const decoded=jwt.verify(token,jwtSecret);
        
        req.user=decoded;
        next();

    }
    catch(err)
    {
        console.log(err);
        res.status(403).json({message:'Unauthorized'});
    }
}


module.exports={generateToken,jwtAuthMiddleware};
