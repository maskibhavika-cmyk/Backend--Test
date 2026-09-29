
const userModel = require('../models/userModel')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const registerController = async (req, res) => {
    try{
        const {userName,phone, email, address, password } = req.body
if (!userName || !phone || !email || !address || !password){
    return res.status(500).send({
        success : false,
        message:'all field not provide'
})
}
const checkUser = await userModel.findOne({email})
if(!checkUser){
return res.status(409).send({
        success: false,
        message: 'user already register'
    })
}

const hashpassword = await bcrypt.hash(password,10)
const user = await userModel.create({
    userName,
    phone,
    email,
    address,
    password:hashpassword

})
 return res.status(200).send({
    success:true,
    message:" user register successfully",
    user
})
    }catch (error) {
console.log(error)
res.status(500).send({
    success: false,
    message:"error in register",
    error
})
    }
}

const loginController = async (req, res) => {
try{
 const { email, password } = req.body
        
if ( !email || !password){
    return res.status(500).send({
        success : false,
        message:'all field  provide'
})
}

const user = await userModel.findOne({email})
if(!user){
return res.status(409).send({
        success: false,
        message: 'user not found'
    })
}
const compare = await bcrypt.compare(password,user.password)
if(!compare){
    return res.status(500).send({
        success:false,
        message:"invalid credentials"
    })
}
const token = jwt.sign({id:user._id},
    process.env.JWT_SECRET,{
        expiresIn:"7d"
    })
    return res.status(200).send({
success:true,
message:"login successfully",
token,
user
    })

    }catch (error) {
console.log(error)
return res.status(500).send({
    success: false,
    message:"error in login",
    error
})
    }
}
module.exports ={registerController, loginController};