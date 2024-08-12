const router = require('express').Router()
const User = require('../models/user.js')
const Course = require('../models/course.js')
const {adminUserValidation,courseValidation} = require('../validations/validate.js')
const {authMiddleware,authLogin,verifyUser} = require('../middleware/checkUser.js')
//SignUp

router.post('/signup',async (req,res)=>{
    try{
        const parsedData = adminUserValidation.safeParse(req.body)
        if(!parsedData.success) return res.status(401).json({error: "Wrong Inputs"})
        const {username, password}= req.body
        const user = await User.findOne({username})
        if(user) return res.status(404).json({error:"Username Already Exist!"})
        await User.create({username,password})
        res.status(201).json({data : "User Signed Up"})
    }catch(err){
        res.status(400).json({error:err})
    }
})

//login
router.get('/allcourses',verifyUser,async(req,res)=>{
    try{
        console.log("Hiiiiiii")
        const courses = await Course.find({}).populate({path: 'createdBy',select:'username'}).exec()
        if(courses.length == 0) return res.status(404).json({error: 'No Courses Available'})
        res.status(200).json({data:courses})
    }catch(err){
        res.status(404).json({error:err})
    }
})

router.post('/login',authLogin, async(req,res)=>{
    try{
        if(req.token) return res.status(200).json({data: "User Loggedin Successfully",token : req.token})
    }catch(err){
        res.status(400).json({error:err})
    }
})

router.post('/courses/:id',verifyUser,async (req,res)=>{
    try{
        const course = await Course.findById(req.params.id)
        if(!course) return res.status(404).json({error: "Invalid Course ID"})
        const username = req.username
        const user = await User.findOne({username}).populate({path : 'purchasedCourse',match:{_id:req.params.id}})
        if(user.purchasedCourse.length!= 0) return res.status(404).json({error:"Course Already Purchased"})
        await User.findByIdAndUpdate((user._id).toString(),{$push: {purchasedCourse : req.params.id}})
        res.status(201).json({data: "Course Purchased Succesfully"})
    }catch(err){
        res.status(500).json({error:err})
    }
})

router.get('/courses',verifyUser, async (req,res)=>{
    try{
        const username = req.username
        const courses = await User.findOne({username}).populate("purchasedCourse")
        res.status(200).json({data:courses.purchasedCourse})
    }catch(err){
        res.status(500).json({error:err})
    }
})

module.exports = router