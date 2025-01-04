const jwt=require("jsonwebtoken");
const dotenv=require("dotenv");
dotenv.config();

const authMiddleware=(req,res,next)=>{
    const token=req.headers.authorization;
    if(!token){
        return res.status(401).json({message:"user is not logged in"});
    }

    try{
    const decoded=jwt.verify(token,process.env.JWT_SECRET);
    req.user = {
        _id: decoded.id};
    next();
       }
    catch(err){
        return res.status(401).json({message:"invalid token"});
}
}

module.exports=authMiddleware;