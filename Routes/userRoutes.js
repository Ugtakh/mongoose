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
const { checkLogin, authorization } = require("../middlewares/auth");

const router = express.Router();

router.route("/login").post(login);
router.route("/register").post(register);

router.route("/").post(createUser).get(getAllUsers);

router
  .route("/:id")
  .get(getUser)
  .put(updateUser)
  .delete(authorization, deleteUser);

module.exports = router;
