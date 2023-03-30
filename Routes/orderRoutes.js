const express = require("express");
const {
  createOrder,
  getAllOrder,
  getOrder,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");
// const { checkLogin, authorization } = require("../middlewares/auth");

const router = express.Router();

router.route("/").post(createOrder).get(getAllOrder);

router.route("/:id").get(getOrder).put(updateOrder).delete(deleteOrder);

module.exports = router;
