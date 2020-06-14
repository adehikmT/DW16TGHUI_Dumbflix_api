const express=require('express')
const Route=express.Router()

// panggil controller
const {read,create,update,destroy,detail}=require('../controllers/transactionController')
const {authToken,authAdmin}=require('../middleware/authMiddleware')
 
Route.get('/transaction',authToken,read)
     .post('/transaction',authToken,create)
     .patch('/transaction/:id',authToken,update)
     .delete('/transaction/:id',authToken,destroy)
module.exports=Route 
  