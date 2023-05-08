const express = require("express");
const { auth } = require("../controllers/userController");
const { checkLogin, authorization } = require("../middlewares/auth");

const router = express.Router();

// router.route("/auth").all(auth());

module.exports = router;
