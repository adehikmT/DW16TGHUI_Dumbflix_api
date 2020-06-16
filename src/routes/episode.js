const express = require("express");
const Route = express.Router();

// panggil controller
const {
  read,
  create,
  update,
  destroy,
  detail,
} = require("../controllers/episodeController");
const { authToken, authAdmin } = require("../middleware/authMiddleware");

Route.get("/filem/:filemId/episodes", read)
  .get("/filem/:filemId/episode/:id", detail)
  .post("/episode", authToken, authAdmin, create)
  .patch("/episode/:id", authToken, authAdmin, update)
  .delete("/episode/:id", authToken, authAdmin, destroy);
module.exports = Route;
