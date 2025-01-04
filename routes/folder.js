const express=require('express')
const router=express.Router()
const authMiddleware=require('../middleware/auth')
const {Folder}=require('../schema/folder.schema')


router.post("/",authMiddleware,async(req,res)=>{
    try{
    const{name}=req.body
    const {user}=req
    const folder=new Folder({name,creator:user})

    await folder.save()
    res.status(201).json(folder)
    }catch(err){
        console.log(err)
        res.status(400).json({message:"error with creating folder"})
    }
})

router.get("/",async(req,res)=>{
    try{
        const{user}=req
        const folder= await Folder.find({creator:user})
        res.status(200).json(folder)
    }catch(error){
        console.log(error)
        res.status(400).json({message:"Error getting the folder"})
    }
})

router.get("/:id",async(req,res)=>{
    try{
        const {id}=req.params

        const folder=await Folder.findById(id)
        res.status(200).json(folder)
    }catch(error){
        console.log(Error)
        res.status(400).json({message:"Error getting the folder"})
    }
})

router.get('/public',async(req,res)=>{
    const folder=await Folder.find()
    res.status(200).json(folder)
})

router.delete("/:id",authMiddleware,async(req,res)=>{
    try{
        const{id}=req.params
        const folder=await Folder.findByIdAndDelete(id)
        res.status(200).json(folder)
    }catch(error){
      console.log(error)
      res.status(400).json({message:"Error deleting the folder"})
    }
    })

module.exports=router
