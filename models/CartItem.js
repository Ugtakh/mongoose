const mongoose = require("mongoose");

const CartItemSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    travel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Travel",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    priceUnit: {
      type: Number,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true }
);

const cartItem = mongoose.model("CartItem", CartItemSchema);

module.exports = cartItem;
