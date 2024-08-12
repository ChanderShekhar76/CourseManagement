const router = require('express').Router()
const Admin = require('../models/admin.js')
const {adminUserValidation,courseValidation} = require('../validations/validate.js')
const {authMiddleware,authLogin,verifyUser} = require('../middleware/checkAdmin.js')
const Course = require('../models/course.js')
const jwt = require('jsonwebtoken')
//SignUp

router.post('/signup',async (req,res)=>{
    try{
        const parsedData = adminUserValidation.safeParse(req.body)
        if(!parsedData.success) return res.status(401).json({error: "Wrong Inputs"})
        const {username, password}= req.body
        const user = await Admin.findOne({username})
        if(user) return res.status(404).json({error: "Username Already Used!"})
        await Admin.create({username,password})
        res.status(201).json({data : "Admin Signed Up"})
    }catch(err){
        res.status(400).json({"error":err})
    }
})

router.post('/login',authLogin, async (req,res)=>{
    if(req.token){
        res.status(201).json({data : "Logged In Successfully", token : req.token})
    }
})

router.post('/courses',verifyUser,async(req,res)=>{
    try{
        const parsedData = courseValidation.safeParse(req.body)
        if(!parsedData.success) return res.status(401).json({error: "Invalid Course Details!"})
        const username = req.username
        const user =await Admin.findOne({username}).populate({path: 'createdCourse',match:{title:req.body.title}}).exec()
        if(user.createdCourse.length != 0) return res.status(200).json({Course :"Course Already Created"})
        const createdCourse = await Course.create({...req.body,createdBy:user._id})
        await Admin.findByIdAndUpdate((user._id).toString(),{$push:{createdCourse}})
        res.status(201).json({data: "Course Has Been Created"})
    }catch(err){
        res.status(400).json({"error":err})
    }
})

router.get('/courses',verifyUser,async(req,res)=>{
    try{
        const username = req.username
        const courses = await Admin.findOne({username}).populate("createdCourse")
        res.status(200).json({data:courses.createdCourse})
    }catch(err){
        res.status(404).json({"error":err})
    }
})

module.exports = router