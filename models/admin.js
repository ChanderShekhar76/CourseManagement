const mongoose = require('mongoose')
const Course = require('./course')
const bcrypt = require('bcrypt')
//Admin Schema
const adminSchema = new mongoose.Schema({
    username : {
        type: String,
        required: true
    },
    password: {
        type : String,
        require : true
    },
    createdCourse : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : Course
        }
    ]
})

adminSchema.pre('save',function(next){
    const user = this
    bcrypt.hash(user.password,10,async (err,hash)=>{
        try{
            user.password=hash
        }catch(err){
            res.status(400).json({error:err})
        }
        next()
    })
})
module.exports = mongoose.model('Admin',adminSchema)