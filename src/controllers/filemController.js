const {filem,category}=require('../models')

const {response,valFilem}=require('../helpers')

module.exports=
{
    read:async(req,res)=>
    {
      return response(res,200,{"":'rd'})
    },
    create:async(req,res)=>
    {
        // const {error}=await valFilem(req.body)
        // if(error) return response(res,400,{"error":error.details[0].message})
        // const check=await category.findOne({where:{"id":req.body.idCategory}})
        // if(!check) return response(res,400,{"error":"data id not found!"})
        // const Categorys = await category.create(req.body)

        return response(res,200,check)
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