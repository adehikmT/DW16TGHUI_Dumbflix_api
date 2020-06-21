const express = require("express");
const Route = express.Router();

// panggil controller
const { destroy, read ,detail} = require("../controllers/userController");
const { authToken, authAdmin } = require("../middleware/authMiddleware");

Route.get("/users", read)
	 .get("/auth/user",authToken,detail)
	 .delete("/user/:id", authToken, authAdmin, destroy);

module.exports = Route;
