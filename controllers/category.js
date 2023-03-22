const Category = require("../models/Category");

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({});
    res.status(201).json({ message: "Бүх категори олдлоо.", categories });
  } catch (error) {
    res.status(400).json({
      message: "Категорийн мэдээллиг авахад алдаа гарлаа.",
      error: error.message,
    });
  }
};

const createCategory = async (req, res, next) => {
  const { title, description, categoryImg, categoryRating } = req.body;

  try {
    const category = await Category.create({
      title,
      description,
      categoryImg,
      categoryRating,
    });
    res.status(201).json({ message: "Амжилттай бүртгэгдлээ", category });
  } catch (err) {
    // res
    //   .status(400)
    //   .json({ message: "Бүртгэл амжилтгүй боллоо.", error: error.message });

    next(err);
  }
};

const getCategory = async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    res.status(400).json({ message: `${id} -тэй категори олдсонгүй.` });
  }

  try {
    const category = await Category.findById(`${id}`);
    res.status(200).json({ message: `${id} тэй категори олдлоо`, category });
  } catch (error) {
    // next(error);
    res.status(400).json({ message: "Алдаа", error: error.message });
  }
};

const updateCategory = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({ message: `${id} -тэй категори олдсонгүй.` });
  }

  try {
    const category = await Category.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res
      .status(200)
      .json({ message: `${id} тэй категори шинэчлэгдлээ`, category });
  } catch (error) {
    res.status(400).json({ message: "Алдаа", error: error.message });
  }
};

const deleteCategory = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({ message: `${id} -тэй категори олдсонгүй.` });
  }

  try {
    const category = await Category.findByIdAndDelete(id);
    res
      .status(200)
      .json({ message: `${id} тэй хэрэглэгч устгагдлаа`, category });
  } catch (error) {
    res.status(400).json({ message: "Алдаа", error: error.message });
  }
};

module.exports = {
  getAllCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
