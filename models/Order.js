const mongoose = require("mongoose");

// const orderItemSchema = new mongoose.Schema({
//   travel: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Travel",
//     required: true,
//     index: true,
//   },
//   quantity: {
//     type: Number,
//     required: true,
//   },
//   priceUnit: {
//     type: Number,
//     required: true,
//   },
// });

const paymentSchema = new mongoose.Schema({
  status: {
    type: String,
    required: true,
    enum: ["CREATED", "SUCCEEDED", "FAILED"],
    default: "CREATED",
  },
  amount: {
    type: Number,
    required: true,
  },
});

const OrderSchema = new mongoose.Schema(
  {
    amount: Number,
    items: {
      type: Object,
      repuired: true,
    },
    status: {
      type: String,
      enum: ["CREATED", "PROCESSING", "SHIPPED", "CANCELLED"],
      default: "CREATED",
    },
    payment: {
      type: paymentSchema,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true }
);

const order = mongoose.model("Order", OrderSchema);

module.exports = order;
