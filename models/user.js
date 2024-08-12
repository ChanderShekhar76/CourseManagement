const mongoose = require('mongoose')
const Course = require('./course')
const bcrypt = require('bcrypt')
//User Schema

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    purchasedCourse : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : Course
    }]
})
userSchema.pre('save',function(next){
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
module.exports = mongoose.model('User',userSchema)