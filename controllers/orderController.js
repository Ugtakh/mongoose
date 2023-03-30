const mongoose = require("mongoose");
const CartItem = require("../models/CartItem");
const Order = require("../models/Order");
const User = require("../models/User");

const getAllOrder = async (req, res, next) => {
  try {
    const orders = await Order.find();

    res.status(201).json({ message: "Амжилттай бүртгэгдлээ", orders });
  } catch (err) {
    next(err);
  } finally {
    console.log("Finished Controller");
  }
};

const createOrder = async (req, res, next) => {
  const { cartId } = req.body;
  console.log("CID", cartId);

  const session = await mongoose.startSession();

  session.startTransaction();

  try {
    const item = await CartItem.findByIdAndDelete(cartId, { session });
    console.log("ITEM", item);
    const newOrder = {
      items: item,
      payment: { amount: 5000 },
    };
    const order = await Order.create([newOrder], { session });
    await session.commitTransaction();
    res.status(201).json({ message: "Амжилттай бүртгэгдлээ", order });
  } catch (err) {
    await session.abortTransaction();
    next(err);
  } finally {
    console.log("Finished Controller");
    session.endSession();
  }
};

const getOrder = async (req, res, next) => {
  const { id } = req.params;
};

const updateOrder = async (req, res) => {
  const { id } = req.params;
};

const deleteOrder = async (req, res) => {
  const { id } = req.params;
};

module.exports = {
  getAllOrder,
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder,
};

/**
 * const item = await CartItem.findByIdAndDelete(cartId);
    console.log("ITEM", item);
    const newOrder = {
      items: item,
      payment: { amount: 5000 },
    };
    const order = await Order.create(newOrder);
 */
