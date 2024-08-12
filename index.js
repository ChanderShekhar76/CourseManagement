const express = require('express')
const app = express()
const connectToDB=require('./db/index')
require('dotenv').config()
const mongoose = require('mongoose')
const port = process.env.PORT || 3000

//Routers
const adminRouter = require('./routers/admin')
const userRouter = require('./routers/user')


//middlewares
app.use(express.json())
app.use('/admin',adminRouter)
app.use('/user',userRouter)
//Start Server
const runServer = async()=>{
    try{
        await connectToDB()
        app.listen(port, () => {
            console.log(`Server Has Started On Port ${port}`)
        })
    }catch(err){
        console.log(err)
    }
}

runServer()



