const express=require('express')
let dotenv=require('dotenv')
// dotenv.config() harus sebelum body parser
dotenv.config()
const morgan=require('morgan')
const bodyParser=require('body-parser')
const routeNavigator=require('./src/index')

const app=express()

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json());
app.use('/api/v1/',routeNavigator)

const server=app.listen(9000,'127.0.0.1',()=>
{
    const port=server.address().port
    const host=server.address().address
    console.log("server run in "+host+":"+port)
})


// console.log(express.Router())


// test debuging
// response part
// let res=require('./helpers')
//     app.post('/',(req,rss)=>{
//         console.log(req.body.name)
//      res.response(rss,'',{ok:"ok"})
//     })
//express test
    // app.get('/',(req,rss)=>rss.send("hallo"))
