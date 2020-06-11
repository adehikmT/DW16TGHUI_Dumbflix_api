const { transaction, user } = require("../models")
//fungsi custome
const helper=require('../helpers')
// call obj method
const {response,valTrans}=helper

module.exports=
{
    read:async(req,res)=>
    {
        try
        {
            const Categorys = await transaction.findAll({
                include: {
                    model: user,
                    attributes: {
                        exclude: ["role"],
                      },
                  },
                  attributes: {
                    exclude: ["userId"],
                  },
            });
            return response(res,200,Categorys)
        }catch(err)
        {
            return response(res,500,{"error":"Internal Server Error"})
        }
    },
    create:async(req,res)=>
    {
        try
        {
            const {error}=await valTrans(req.body)
            if(error) return response(res,400,{"error":error.details[0].message})
            // const Categorys = await category.create(req.body)
            return response(res,200,Categorys)
        }catch(err)
        {
            return response(res,500,{"error":"Internal Server Error"})
        }
    },
    update:async(req,res)=>
    {
        // try
        // {
        //     const {id}=req.params
        //     const check=await category.findOne({
        //     where: { id }
        //     })
        //     if(!check) return response(res,404,{"error":"data not found!"})
        //     const {error}=await valCat(req.body)
        //     if(error) return response(res,400,{"error":error.details[0].message})
        //     const update=await category.update(
        //         req.body,
        //         {where:{"id":check.id}}
        //         )
        //     if(update<1) return response(res,201,{"message":"request succes but no update"})
        //     const {name}=req.body
        //     return response(res,200,{id,name})
        // }catch(err)
        // {

        //     console.log(err)
            return response(res,500,{"error":"Internal Server Error"})
        // }
    },
    destroy:async(req,res)=>
    {
        // try
        // {
        //     const {id}=req.params
        //     const destroy=await category.destroy({where:{id}})
        //     if(destroy<1){return response(res,400,{"error":"data not found"})}
        //     return response(res,200,{id})
        // }catch(err)
        // {
            return response(res,500,{"error":"Internal Server Error"})
        // }
    }
}