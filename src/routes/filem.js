const express=require('express')
const Route=express.Router()

// panggil controller
const {read,create,update,destroy}=require('../controllers/filemController')
// const {authToken,authAdmin}=require('../middleware/authMiddleware')

Route.get('/filem',read)
     .post('/filem',create)
     .patch('/filem/:id',update)
     .delete('/filem/:id',destroy)
module.exports=Route 
 