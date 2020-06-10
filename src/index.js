const express=require('express')
const Route=express.Router()

/*
Route Page
*/
const Auth=require('./routes/auth')
const Category=require('./routes/category')
const User=require('./routes/user')
// const Episode=require('./routes/episode')
// const Filem=require('./routes/filem')
// const Transaction=require('./routes/transaction')
// const User=require('./routes/user')
/*
use Route Page
*/
Route.use(Auth)
Route.use(Category)
Route.use(User)
// Route.use('/episodes',Episode)
// Route.use('/filems',Filem)
// Route.use('/transactions',Transaction)
// Route.use('/users',User)

// console.log(Route+'\n'+'navigator')

module.exports=Route

//kenapa router() buka route() karena router punya yang namanya parameter/function next()
//yang nantinya di gunain di middleware