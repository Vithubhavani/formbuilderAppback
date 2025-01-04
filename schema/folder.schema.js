const mongoose=require('mongoose')
const Schema=mongoose.Schema

const FolderSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        Default:Date.now
    },
    creator:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"

    },
    isPublic: {
        type: Boolean,
        default: false, 
    },
   

})

const Folder=mongoose.model("Folder",FolderSchema)

module.exports={Folder}


