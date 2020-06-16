const express = require("express");
const Route = express.Router();

// panggil controller
const { register, login, logout } = require("../controllers/authController");
const upload = require("../helpers/upload");
const { response } = require("../helpers");

Route.post("/registration", register)
  .post("/login", login)
  .post("/logout", logout);
//   .post("/upload", upload, (req, res) => {
//     return response(res, 200, req.body);
//   })
//   .post("/form", upload, (req, res) => {
//     response(res, 200, req.file);
//     console.log(req.body);
//   });

// console.log(Route)

module.exports = Route;

// chaining method
