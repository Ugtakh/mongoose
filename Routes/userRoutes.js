const express = require("express");
const {
  login,
  register,
  createUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const checkRole = require("../utils/checkRole");

const router = express.Router();

router.route("/login").post(login);
router.route("/register").post(register);

router.route("/").post(checkRole, createUser).get(checkRole, getAllUsers);

router.route("/:id").get(getUser).put(updateUser).delete(deleteUser);

module.exports = router;
