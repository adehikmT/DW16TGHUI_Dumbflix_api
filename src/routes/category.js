const express = require("express");
const Route = express.Router();

// panggil controller
const {
  read,
  create,
  update,
  destroy,
} = require("../controllers/categoryController");
const { authToken, authAdmin } = require("../middleware/authMiddleware");

Route.get("/category", read)
  .post("/category", authToken, authAdmin, create)
  .patch("/category/:id", authToken, authAdmin, update)
  .delete("/category/:id", authToken, authAdmin, destroy);
module.exports = Route;
