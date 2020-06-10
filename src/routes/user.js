const express=require('express')
const Route=express.Router()

// panggil controller
const {destroy}=require('../controllers/userController')
const {authToken,authAdmin}=require('../middleware/authMiddleware')

Route.delete('/category/:id',authToken,authAdmin,destroy)
module.exports=Route 
 