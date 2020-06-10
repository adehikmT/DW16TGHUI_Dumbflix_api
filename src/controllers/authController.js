const { user } = require("../models")
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");
//fungsi custome
const helper=require('../helpers')
// call obj method
const {response,valRegist,valLogin}=helper

module.exports=
{
    register:async(req,res)=>
    {
        try
        {
            const { error } =await valRegist(req.body)
            // console.log(error)
            if(error) return response(res,400,{"error":error.details[0].message})
            //cek email hast password
            const {email,password}=req.body
            const User = await user.findOne({
                where: { email },
            });
            //   console.log(User) jika true maka
            if (User) return response(res,409,{"error":"Email already exists"})
            req.body.subscibe=0
            req.body.role=0
            const hashedPassword = await bcrypt.hash(password, 10)
            const userCreated = await user.create({ ...req.body, password: hashedPassword})
            const token = jwt.sign({ id: userCreated.id }, process.env.API_KEY)
            return response(res,200,{email,token})
        }catch(err)
        {
            console.log(err)
            return response(res,500,{"error":"Internal Server Error"})
        }
    },
    login:async(req,res)=>
    {
        try
        {
            const {error} =await valLogin(req.body)
            if(error) return response(res,400,{"error":error.details[0].message})
            const {email,password}=req.body
            const User = await user.findOne({
                where: { email },
            });
            if (!User) return response(res,409,{"error":"Invalid Login"})
            const validPass = await bcrypt.compare(password, User.password)
            if (!validPass) return response(res,409,{"error":"Invalid Login"})
            const token = jwt.sign({ id: User.id }, process.env.API_KEY)
            return response(res,200,{email,token})
        }catch(err)
        {
            console.log(err)
            return response(res,500,{"error":"Internal Server Error"})
        }
    },
    logout:async(req,res)=>
    {
        return response(res,200,{"message":"logout success"})
    }
}