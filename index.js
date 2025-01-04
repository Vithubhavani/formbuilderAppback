const express=require('express')
const app=express()
const dotenv=require('dotenv')
dotenv.config()
const {incomingrequest}=require('./middleware/index')
const mongoose=require('mongoose')
const bodyParser=require('body-parser')
const cors=require("cors")

app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

const indexrouter=require('./routes/index')
const userrouter=require('./routes/user')
const folderrouter=require('./routes/folder')
const formrouter=require('./routes/form')
const usernamerouter=require('./routes/username')
const sharerouter=require('./routes/share')
const createform=require('./routes/formCreate')
const dashboard=require('./routes/shareLink')

app.use(incomingrequest)
app.use("/api/form",indexrouter)
app.use('/api/form/user',userrouter)
app.use('/api/form/folder',folderrouter)
app.use('/api/form/botform',formrouter)
app.use('/api/form/username',usernamerouter)
app.use('/api/form/share',sharerouter)
app.use('/api/form/createform',createform)
app.use('/api/form/dashboard',dashboard)




app.listen(process.env.PORT,()=>{
    console.log("server started on port 3000")

    mongoose.connect(process.env.MONGOOSE_URI_STRING,{
      
    })
    mongoose.connection.on('error',err=>{
        console.log(err)
    })
})