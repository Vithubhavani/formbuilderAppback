const mongoose=require('mongoose')
const Schema=mongoose.Schema
   
   
  const shareLink=new Schema({
    token:{
        type:String,
        required:true,
        unique:true
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
    accessLevel:{
        type:String,
        enum:['view','edit'],
        default:'view'
    }
});

const ShareLink=mongoose.model('ShareLink',shareLink)
module.exports=ShareLink;