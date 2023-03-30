const CartItem = require("../models/CartItem");

const getAllCartItem = async (req, res, next) => {
  try {
    const orders = await Order.find();

    res.status(201).json({ message: "Амжилттай бүртгэгдлээ", orders });
  } catch (err) {
    next(err);
  } finally {
    console.log("Finished Controller");
  }
};

const createCartItem = async (req, res, next) => {
  //   const { name, email, password, profileImg } = req.body;

  const newTravel = {
    user: "641c13605a7cccb50e4545fa",
    travel: "641bf631236a48def5646b48",
    quantity: 1,
    priceUnit: 5000,
  };

  try {
    const cartItem = await CartItem.create(newTravel);

    res.status(201).json({ message: "Амжилттай карт руу нэмлээ.", cartItem });
  } catch (err) {
    next(err);
  } finally {
    console.log("Finished Controller");
  }
};

const getCartItem = async (req, res, next) => {
  const { id } = req.params;
};

const updateCartItem = async (req, res) => {
  const { id } = req.params;
};

const deleteCartItem = async (req, res) => {
  const { id } = req.params;
};

module.exports = {
  getAllCartItem,
  createCartItem,
  getCartItem,
  updateCartItem,
  deleteCartItem,
};
