const express = require("express");
const {
  createCartItem,
  getAllCartItem,
} = require("../controllers/cartItemController");
// const { checkLogin, authorization } = require("../middlewares/auth");

const router = express.Router();

router.route("/").post(createCartItem).get(getAllCartItem);

module.exports = router;
