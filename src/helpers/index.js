const Joi = require("@hapi/joi");

module.exports=
{
    response: (res,status,data,pagination)=>{
        const result={}
        // result.status=status || 200
        result.data=data
        result.pagination=pagination
        return res.status(status).json(result)
    },
    valRegist:async(data)=>
    { 
        schema = Joi.object({
        fullName: Joi.string().alphanum().min(3).required(),
        email: Joi.string().email().min(6).required(),
        password: Joi.string().min(6).required(),
        gendre:Joi.string(),
        phone:Joi.number().min(12),
        address:Joi.string()
        });
        // console.log(data)
        return schema.validate(data)
    },
    valLogin:async(data)=>
    { 
        schema = Joi.object({
        email: Joi.string().email().min(6).required(),
        password: Joi.string().min(6).required()
        });
        // console.log(data)
        return schema.validate(data)
    },
    valCat:async(data)=>
    {
        schema=Joi.object({
        name: Joi.string().required()
        });
        return schema.validate(data)
    }
} 

// response.status(result.status) nyeting agar response codenya sesuai dengan parameter .json(result) 
//nanti array dari responsenya akan di tambahkan dengan jeson result yang berisi data 
//exmple {
//          status:200,
//          data:{isi dari result},
//          pagination:
//       }