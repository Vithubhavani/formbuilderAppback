const express=require('express')
const router=express.Router();
const bcrypt=require('bcryptjs')
const jsonwebtoken=require('jsonwebtoken')
const {User}=require("../schema/user.schema")
const dotenv=require('dotenv')
dotenv.config()



router.post("/signup",async(req,res)=>{
const{name,email,password,}=req.body;

const ifUserexist=await User.findOne({email})

if(ifUserexist){
    return res.status(400).json({message:"user already exist"})

}

const hashedpassword=await bcrypt.hash(password,10)
const user=new User({name,email,password:hashedpassword})
await user.save();
res.status(201).json({message:"user created successfully"})
})


router.get("/",async(req,res)=>{
    const users=await User.find().select("-password")
    res.status(200).json(users)
})




router.post("/signin",async(req,res)=>{
    const{email,password}=req.body;
    
    const user=await User.findOne({email})

    if(!user){
        res.status(400).json({message:"invalid credential"})   
    }

    const passwordexist=await bcrypt.compare(password,user.password)

    if(!passwordexist){
        return res.status(400).json({message:"invalid credential"})
    }
    const payload={id:user._id};
    const token=jsonwebtoken.sign(payload,process.env.JWT_SECRET)
    res.status(200).json({message:"login successful",token})
})

router.get("/emails",async (req, res) => {
    try {

      const users = await User.find().select("email -_id"); // Fetch only the email field
      const emails = users.map(user => user.email);
      res.status(200).json(emails);
    } catch (error) {
      console.error("Error fetching emails:", error);
      res.status(500).json({ message: "Failed to fetch emails" });
    }
  });
  


module.exports=router