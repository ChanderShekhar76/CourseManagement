const mongoose = require('mongoose')
const Admin = require('./admin')
//Course Schema

const courseSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required: true
    },
    image : {
        type : String,
        required : true
    },
    createdBy:{
        type : mongoose.Schema.Types.ObjectId,
        ref: 'Admin',
        required:true
    }
})

module.exports = mongoose.model('Course',courseSchema)