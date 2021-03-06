const Joi = require("@hapi/joi");
const fs = require("fs");

module.exports = {
  response: (res, status, data, pagination) => {
    const result = {};
    result.status = status || 200;
    result.data = data;
    result.pagination = pagination;
    return res.status(status).json(result);
  },
  valRegist: async (data) => {
    schema = Joi.object({
      fullName: Joi.string().min(3).required(),
      email: Joi.string().email().min(6).required(),
      password: Joi.string().min(6).required(),
      gendre: Joi.string(),
      phone: Joi.number().min(12),
      address: Joi.string(),
    });
    // console.log(data)
    return schema.validate(data);
  },
  valLogin: async (data) => {
    schema = Joi.object({
      email: Joi.string().email().min(6).required(),
      password: Joi.string().min(6).required(),
    });
    // console.log(data)
    return schema.validate(data);
  },
  valCat: async (data) => {
    schema = Joi.object({
      name: Joi.string().required(),
    });
    return schema.validate(data);
  },
  valFilm: async (data) => {
    schema = Joi.object({
      title: Joi.string().required(),
      thumbnailFilm: Joi.string(),
      year: Joi.number(),
      categoryId: Joi.number().required(),
      description: Joi.string(),
      linkFilm: Joi.string(),
    });
    return schema.validate(data);
  },
  valTrans: async (data) => {
    schema = Joi.object({
      startDate: Joi.string().required(),
      dueDate: Joi.string().required(),
      userStatus: Joi.required(),
      status: Joi.string().required(),
    });
    return schema.validate(data);
  },
  valEpisode: async (data) => {
    schema = Joi.object({
      title: Joi.string().required(),
      thumbnailFilem: Joi.string().required(),
      linkFilem: Joi.string().required(),
      filemId: Joi.number().required(),
    });
    return schema.validate(data);
  },
  deleteUpload: async (img) => {
    fs.stat(__dirname + "../../../public/images/" + img, function (err, stats) {
      console.log(stats);
      if (err) {
        return console.error(err);
      }
      fs.unlink(__dirname + "../../../public/images/" + img, function (err) {
        if (err) return console.log(err);
        console.log("file deleted successfully");
      });
    });
  },
};
