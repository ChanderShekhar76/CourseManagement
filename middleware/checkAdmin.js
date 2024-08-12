const bcrypt = require('bcrypt')
const Admin = require('../models/admin')
const { adminUserValidation } = require('../validations/validate')
const jwt = require('jsonwebtoken')
require('dotenv').config()

//authorization based on username and password
const authMiddleware = async (req, res, next) => {
    try {
        const { username, password } = req.headers
        const parsedHeaders = adminUserValidation.safeParse({ username, password })
        if (!parsedHeaders.success) return res.status(400).json({ error: "Username Or Password Invalid Syntax" })
        const user = await Admin.findOne({ username: username })
        if (!user) return res.status(400).json({ error: "Username Doesn't Exist" })
        bcrypt.compare(password, user.password, (err, result) => {
            if (result) {
                req.user = user
            } else {
                res.status(400).json({ error: "Wrong Password" })
            }
            next()
        })
    }
    catch (err) {
        res.status(500).json({ error: err })
    }
}

//JWT authorization
const authLogin = async (req,res,next)=>{
    try {
        const { username, password } = req.headers
        const parsedHeaders = adminUserValidation.safeParse({ username, password })
        if (!parsedHeaders.success) return res.status(400).json({ error: "Username Or Password Invalid Syntax" })
        const user = await Admin.findOne({ username: username })
        if (!user) return res.status(400).json({ error: "Username Doesn't Exist" })
        bcrypt.compare(password, user.password, (err, result) => {
            if (result) {
                const token = jwt.sign({username},process.env.SECRET_KEY,{expiresIn:'30m'})
                req.token = token
            } else {
                res.status(400).json({ error: "Wrong Password" })
            }
            next()
        })
    }
    catch (err) {
        res.status(500).json({ error: err })
    }
}
const verifyUser = async (req,res,next)=>{
    try{
        const {authorization} = req.headers
        if(authorization){
            const token = authorization.split(" ")[1]
            const data = jwt.verify(token,process.env.SECRET_KEY)
            if(data.username){
                req.username = data.username
                next()
            }
        }else{
            res.status(404).json({error: "Token Is Incorrect"})
        }
    }
    catch(err){
        res.status(400).json({error:err})
    }
}

module.exports = {authMiddleware,authLogin,verifyUser}