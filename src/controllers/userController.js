const { user } = require("../models")

const helper= require('../helpers')

const {response}=helper

module.exports=
{
    read:async(req,res)=>
    {
        try
        {
            const users= await user.findAll();
            return response(res,200,users)
        }catch(err)
        {
            return response(res,500,{"error":"Internal Server Error"})
        }
    },
    destroy:async(req,res)=>
    {
        try
        {
            const {id}=req.params
            const destroy=await user.destroy({where:{id}})
            if(destroy<1){return response(res,404,{"error":"data not found"})}
            return response(res,200,{id})
        }catch(err)
        {
            return response(res,500,{"error":"Internal Server Error"})
        }
    },
}