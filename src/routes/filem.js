const express = require("express");
const Route = express.Router();

// panggil controller
const {
  read,
  create,
  update,
  destroy,
  detail,
} = require("../controllers/filemController");
const { authToken, authAdmin } = require("../middleware/authMiddleware");
const {userExp} =require("../middleware/checkExp")

Route.get("/film", read)
  .get("/film/:id",authToken,userExp, detail)
  .post("/film", authToken, authAdmin, create)
  .patch("/film/:id", authToken, authAdmin, update)
  .delete("/film/:id", authToken, authAdmin, destroy);
module.exports = Route;
