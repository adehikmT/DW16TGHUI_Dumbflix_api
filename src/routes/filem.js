const express=require('express')
const Route=express.Router()

// panggil controller
const {read,create,update,destroy,detail}=require('../controllers/filemController')
const {authToken,authAdmin}=require('../middleware/authMiddleware')

Route.get('/filem',read)
     .get('/filem/:id',detail)
     .post('/filem',authToken,authAdmin,create)
     .patch('/filem/:id',authToken,authAdmin,update)
     .delete('/filem/:id',authToken,authAdmin,destroy)
module.exports=Route 
  