const mongoose=require('mongoose')
const Schema=mongoose.Schema

const FormSchema=new Schema({
    name:{
       type:String,
        required:true
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

const Form=mongoose.model("Form",FormSchema)

module.exports={Form}