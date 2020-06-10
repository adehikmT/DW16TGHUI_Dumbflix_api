const { user } = require("../models")

const {response}=helper

module.exports=
{
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