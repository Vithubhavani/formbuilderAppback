const mongoose=require("mongoose")
const Schema=mongoose.Schema

const sharingByemail=new Schema({
    emailto:{
        type:String,
        required:true
    },
    accessLevel:{
        type:String,
        enum:['view','edit'],
        required:true
    },
    dashboardId:{
     type:String
    },
    folderIds:{
        type:[String]
    },
    formIds:{
        type:[String]
    },
    sharedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
})

const SharingByEmail=mongoose.model('SharingByEmail',sharingByemail)

module.exports=SharingByEmail;