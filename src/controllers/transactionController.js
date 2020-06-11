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
            const User= await user.findOne({where:{"id":req.body.userId}})
            if(!User) return response(res,400,{"message":"User not found"})
            const Transaction = await transaction.create(req.body)
            const inserted = await transaction.findOne({
                include: {
                  model: user,
                  attributes: {
                    exclude: ["role"],
                  },
                },
                attributes: {
                  exclude: ["userId"],
                },
                where:{"id":Transaction.id}
              });
            return response(res,200,inserted)
        }catch(err)
        {
            return response(res,500,{"error":"Internal Server Error"})
        }
    },
    update:async(req,res)=>
    {
        try
        {
            const {id}=req.params
            const check=await transaction.findOne({
            where: { id }
            })
            if(!check) return response(res,400,{"error":"user not found!"})
            const {error}=await valTrans(req.body)
            if(error) return response(res,400,{"error":error.details[0].message})
            const update=await transaction.update(
                req.body,
                {where:{"id":check.id}}
                )
            if(update<1) return response(res,201,{"message":"request succes but no update"})
            const updated = await transaction.findOne({
                    include: {
                      model: user,
                      attributes: {
                        exclude: ["role"],
                      },
                    },
                    attributes: {
                      exclude: ["userId"],
                    },
                    where:{"id":id}
                  });
            return response(res,200,updated)
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
            const destroy=await transaction.destroy({where:{id}})
            if(destroy<1){return response(res,400,{"error":"transaction not found"})}
            return response(res,200,{id})
        }catch(err)
        {
            return response(res,500,{"error":"Internal Server Error"})
        }
    }
}