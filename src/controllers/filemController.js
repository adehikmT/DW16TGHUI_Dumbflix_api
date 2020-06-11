const {filem}=require('../models')

const {response}=require('../helpers')

module.exports=
{
    read:async(req,res)=>
    {
      return response(res,200,{"":'rd'})
    },
    create:async(req,res)=>
    {
        return response(res,200,{"":'crt'})
    },
    update:async(req,res)=>
    {
        return response(res,200,{"":'upt'})
    },
    destroy:async(req,res)=>
    {
        return response(res,200,{"":'dlt'})
    }
}