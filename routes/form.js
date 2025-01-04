const express=require('express')
const router=express.Router()
const authMiddleware=require('../middleware/auth')
const {Form}=require('../schema/form.schema')




router.post("/",authMiddleware,async(req,res)=>{
    try{
    const{name}=req.body
    const {user}=req
    const form=new Form({name,creator:user})

    await form.save()
    res.status(201).json(form)
    }catch(err){
        console.log(err)
        res.status(400).json({message:"error with creating folder"})
    }

})

router.get("/",authMiddleware, async(req,res)=>{
    try{
        const form= await Form.find({creator:req.user})
        res.status(200).json(form)
    }catch(error){
        console.log(error)
        res.status(200).json({message:"Error getting the form"})
    }
})

router.get("/:id",async(req,res)=>{
    try{
        const {id}=req.params
        const form=await Form.findById(id)
        res.status(200).json(form)
    }catch(error){
        console.log(Error)
        res.status(400).json({message:"Error getting the form"})
    }
})

router.get('/public',async(req,res)=>{
    const form=await Form.find()
    res.status(200).json(form)
})

router.delete("/:id",authMiddleware,async(req,res)=>{
    try{
        const{id}=req.params
        const form=await Form.findByIdAndDelete(id)
        res.status(200).json(form)
    }catch(error){
      console.log(error)
      res.status(400).json({message:"Error deleting the form"})
    }
    })

module.exports=router