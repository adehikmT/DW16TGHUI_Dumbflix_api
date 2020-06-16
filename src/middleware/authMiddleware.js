const jwt = require("jsonwebtoken");
const { user } = require("../models");
const helper = require("../helpers");

const { response } = helper;

module.exports = {
  authToken: (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      token = authHeader.split(" ")[1];
      const verified = jwt.verify(token, process.env.API_KEY);
      req.user = verified;
      next();
    } else {
      return response(res, 401, { error: "Access denied!" });
    }
  },
  authAdmin: async (req, res, next) => {
    try {
      const { id } = req.user;
      const User = await user.findOne({ where: { id } });
      if (User.role === 1) {
        next();
      } else {
        return response(res, 401, { error: "Access denied!" });
      }
    } catch (err) {
      return response(res, 401, { error: "Access denied!" });
    }
  },
};
