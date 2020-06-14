const express=require('express')
let dotenv=require('dotenv')
// dotenv.config() harus sebelum body parser
dotenv.config()
const morgan=require('morgan')
const app=express()

const bodyParser=require('body-parser')
app.use(bodyParser.urlencoded({limit:'50mb',extended:false}))
app.use(bodyParser.json())

app.use(morgan('dev'))

app.use(express.static('public'))

const routeNavigator=require('./src')
app.use('/api/v1/',routeNavigator)

const server=app.listen(9000,'127.0.0.1',()=>  //arrow func ,callback function
{
    const port=server.address().port
    const host=server.address().address
    console.log("server run in "+host+":"+port)
})

// require('./src/config/redis')
// const cche =require('./src/middleware/chace')
// console.log(express.Router())
// console.log(cche)
//file routes yang ke 2 itu goib langsung generate sendiri kalo di hapus yang routenya juga kehapus , nambahinnya setelah aku bikin upload

// test debuging
// response part
// let res=require('./helpers')
//     app.post('/',(req,rss)=>{
//         console.log(req.body.name)
//      res.response(rss,'',{ok:"ok"})
//     })
//express test
    // app.get('/',(req,rss)=>rss.send("hallo"))
