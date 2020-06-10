const express=require('express')
const Route=express.Router()

// panggil controller
const {register,login,logout}=require('../controllers/authController')

Route.post('/registrasi',register)
     .post('/login',login)
     .post('/logout',logout)

// console.log(Route)

module.exports=Route 

// chaining method