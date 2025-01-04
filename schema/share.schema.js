const mongoose=require('mongoose')
const Schema=mongoose.Schema;

const shareSchema=new Schema({
    name: { 
        type: String, 
        required: true },
    owner: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    sharedWith: [
      {
        email: {
             type: String,
              required: true
             },
        accessType: { 
            type: String, 
            enum: ['view', 'edit'], 
            required: true 
        },
      },
    ],
    sharedLink: {
      link: { 
        type: String 
    },
      accessType: { 
        type: String, 
        enum: ['view', 'edit'] 
    },
    }, 
});

const Share=mongoose.model('Share',shareSchema)
module.exports={Share}
