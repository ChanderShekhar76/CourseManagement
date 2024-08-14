// Import the mongoose library for MongoDB interaction
const mongoose = require('mongoose')
// Load environment variables from a .env file
require('dotenv').config()
// Function to connect to MongoDB using Mongoose
const connectToDB = async()=>{
        // Connect to MongoDB using the connection string from environment variables
        await mongoose.connect(process.env.URL)
        console.log('Connected To DB')
}

module.exports = connectToDB
