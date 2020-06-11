const express=require('express')
const Route=express.Router()

// panggil controller
const {destroy,read}=require('../controllers/userController')
const {authToken,authAdmin}=require('../middleware/authMiddleware')

Route.get('/users',read)
     .delete('/user/:id',authToken,authAdmin,destroy)

module.exports=Route 
  