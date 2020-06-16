const { episode, filem, category } = require("../models");
//fungsi custome
const helper = require("../helpers");
// call obj method
const { response, valEpisode } = helper;

// custom methoid
module.exports = {
  read: async (req, res) => {
    try {
      const { filemId } = req.params;
      const Episode = await episode.findAll({
        include: {
          model: filem,
          where: { id: filemId },
          include: {
            model: category,
          },
          attributes: {
            exclude: ["categoryId"],
          },
        },
        attributes: {
          exclude: ["filemId"],
        },
      });
      return response(res, 200, Episode);
    } catch (err) {
      return response(res, 500, { error: "Internal Server Error" });
    }
  },
  create: async (req, res) => {
    try {
      const { error } = await valEpisode(req.body);
      if (error) return response(res, 400, { error: error.details[0].message });
      const Filem = await filem.findOne({ where: { id: req.body.filemId } });
      if (!Filem) return response(res, 400, { message: "Filem not found" });
      const insert = await episode.create(req.body);
      const inserted = await episode.findOne({
        include: {
          model: filem,
          where: { id: Filem.id },
          include: {
            model: category,
          },
          attributes: {
            exclude: ["categoryId"],
          },
        },
        where: { id: insert.id },
        attributes: {
          exclude: ["filemId"],
        },
      });
      return response(res, 200, inserted);
    } catch (err) {
      return response(res, 500, { error: "Internal Server Error" });
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const check = await episode.findOne({ where: { id } });
      if (!check) return response(res, 400, { error: "Episode not found!" });
      const { error } = await valEpisode(req.body);
      if (error) return response(res, 400, { error: error.details[0].message });
      const update = await episode.update(req.body, {
        where: { id: check.id },
      });
      if (update < 1)
        return response(res, 201, { message: "request succes but no update" });
      const updated = await episode.findOne({
        include: {
          model: filem,
          include: {
            model: category,
          },
          attributes: {
            exclude: ["categoryId"],
          },
        },
        where: { id: check.id },
        attributes: {
          exclude: ["filemId"],
        },
      });
      return response(res, 200, updated);
    } catch (err) {
      return response(res, 500, { error: "Internal Server Error" });
    }
  },
  destroy: async (req, res) => {
    try {
      const { id } = req.params;
      const destroy = await episode.destroy({ where: { id } });
      if (destroy < 1) {
        return response(res, 404, { error: "Category not found" });
      }
      return response(res, 200, { id });
    } catch (err) {
      return response(res, 500, { error: "Internal Server Error" });
    }
  },
  detail: async (req, res) => {
    try {
      const { id } = req.params;
      const data = await episode.findOne({
        include: {
          model: filem,
          include: {
            model: category,
          },
          attributes: {
            exclude: ["categoryId"],
          },
        },
        where: { id },
        attributes: {
          exclude: ["filemId"],
        },
      });
      if (!data) return response(res, 200, []);
      return response(res, 200, data);
    } catch (err) {
      return response(res, 500, { error: "Internal Server Error" });
    }
  },
};
