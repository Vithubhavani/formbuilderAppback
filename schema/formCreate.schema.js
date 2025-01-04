const mongoose=require('mongoose')
const Schema=mongoose.Schema

const formCreateSchema=new Schema({
    title:{
        type:String,
        required:true
    },

    elements: [
        {
          type: {
            type: String,
            enum: ["text", "img", "number", "email", "phone", "date", "rating", "button"],
            required: true,
          },
          content: { type: String }, // For bubbles
          placeholder: { type: String }, // For inputs
          isBubble: { type: Boolean },
          isInput: { type: Boolean },
        },
      ],

    creator:{
         type:mongoose.Schema.Types.ObjectId,
         ref:"User"
     },

     views: {
      type: Number,
      default: 0 // Tracks the number of times the form is viewed
  },
  submissions: {
      type: Number,
      default: 0 // Tracks the number of times the form is submitted
  },
  submittedData: [
      {
          inputs: {
              type: Map, // Allows for flexible key-value pairs for input data
              of: String // Assuming all input values are strings; adjust as needed
          },
          submittedAt: {
              type: Date,
              default: Date.now // Automatically records submission timestamp
          }
        }
      ]
    

    
})

const FormCreate=mongoose.model("FormCreate",formCreateSchema)

module.exports={FormCreate}