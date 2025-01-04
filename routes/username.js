const express=require('express')
const router=express.Router()
const authMiddleware=require('../middleware/auth')
const {User}=require('../schema/user.schema')

router.get('/',authMiddleware,async(req,res)=>{
   try{
    const userId=req.user._id;
    console.log(userId);
    const user=await User.findById(userId);

    if(!user){
        return res.status(404).json({message:"user not found"});
    }

    res.json({name:user.name});
   } catch (error) {
       console.log(error);
       res.status(500).json({message:"server error",error});
   }
})

module.exports=router