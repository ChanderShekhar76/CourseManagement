const mongoose = require('mongoose')
require('dotenv').config()
const connectToDB = async()=>{
        await mongoose.connect(process.env.URL)
        console.log('Connected To DB')
}

module.exports = connectToDB
