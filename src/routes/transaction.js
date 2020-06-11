const express=require('express')
const Route=express.Router()

// panggil controller
const {read,create,update,destroy,detail}=require('../controllers/transactionController')
// const {authToken,authAdmin}=require('../middleware/authMiddleware')

Route.get('/transaction',read)
     .post('/transaction',create)
     .patch('/transaction/:id',update)
     .delete('/transaction/:id',destroy)
module.exports=Route 
 