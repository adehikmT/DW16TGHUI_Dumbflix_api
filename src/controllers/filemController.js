const { category, filem } = require("../models")
//fungsi custome
const helper=require('../helpers')
// call obj method
const {response,valFilm}=helper

// custom methoid
module.exports=
{
    read:async(req,res)=>
    {
        try
        {
            const Filem = await filem.findAll({
                include: {
                  model: category
                },
                attributes: {
                  exclude: ["categoryId"],
                },
              });
            return response(res,200,Filem)
        }catch(err)
        {
            return response(res,500,{"error":"Internal Server Error"})
        }
    },
    create:async(req,res)=>
    {
        try
        {
            const {error}=await valFilm(req.body)
            if(error) return response(res,400,{"error":error.details[0].message})
            const Category= await category.findOne({where:{"id":req.body.categoryId}})
            if(!Category) return response(res,400,{"message":"Category not found"})
            const Filem = await filem.create(req.body)
            const inserted = await filem.findOne({
                include: {
                  model: category
                },
                attributes: {
                  exclude: ["categoryId"],
                },
                where:{"id":Filem.id}
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
            const check=await filem.findOne({
            where: { id }
            })
            if(!check) return response(res,400,{"error":"data not found!"})
            const {error}=await valFilm(req.body)
            if(error) return response(res,400,{"error":error.details[0].message})
            const update=await filem.update(
                req.body,
                {where:{"id":check.id}}
                )
            if(update<1) return response(res,201,{"message":"request succes but no update"})
            const updated = await filem.findOne({
                include: {
                  model: category
                },
                attributes: {
                  exclude: ["categoryId"],
                },
                where:{"id":id}
              });
            return response(res,200,updated)
        }catch(err)
        {

            console.log(err)
            return response(res,500,{"error":"Internal Server Error"})
        }
    },
    destroy:async(req,res)=>
    {
        try
        {
            const {id}=req.params
            const destroy=await filem.destroy({where:{id}})
            if(destroy<1){return response(res,404,{"error":"data not found"})}
            return response(res,200,{id})
        }catch(err)
        {
            return response(res,500,{"error":"Internal Server Error"})
        }
    },
    detail:async(req,res)=>
    {
      try
      {
        const {id}=req.params
        const data = await filem.findOne({
          include: {
            model: category
          },
          attributes: {
            exclude: ["categoryId"],
          },
          where:{"id":id}
        });
        return response(res,200,data)
      }catch(err)
      {
        return response(res,500,{"error":"Internal Server Error"})
      }
    }
}