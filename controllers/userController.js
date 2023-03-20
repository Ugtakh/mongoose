const User = require("../models/User");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(201).json({ message: "Хэрэглэгчдийн мэдээлэл олдлоо.", users });
  } catch (error) {
    res.status(400).json({
      message: "Хэрэглэгчдийн мэдээллиг авахад алдаа гарлаа.",
      error: error.message,
    });
  }
};

const createUser = async (req, res, next) => {
  const { name, email, password, profileImg } = req.body;

  if (!name || !email || !password) {
    res
      .status(400)
      .json({ message: "Нэр, имэйл эсвэл нууц үг байхгүй байна." });
  }

  try {
    const user = await User.create({
      name,
      email,
      password,
      profileImg,
    });
    res.status(201).json({ message: "Амжилттай бүртгэгдлээ", user });
  } catch (err) {
    // res
    //   .status(400)
    //   .json({ message: "Бүртгэл амжилтгүй боллоо.", error: error.message });

    next(err);
  }
};

const getUser = async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    res.status(400).json({ message: `${id} -тэй хэрэглэгч олдсонгүй.` });
  }

  try {
    const user = await User.findById(`${id}`);
    res.status(200).json({ message: `${id} тэй хэрэглэгч олдлоо`, user });
  } catch (error) {
    // next(error);
    res.status(400).json({ message: "Алдаа", error: error.message });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({ message: `${id} -тэй хэрэглэгч олдсонгүй.` });
  }

  try {
    const user = await User.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({ message: `${id} тэй хэрэглэгч шинэчлэгдлээ`, user });
  } catch (error) {
    res.status(400).json({ message: "Алдаа", error: error.message });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({ message: `${id} -тэй хэрэглэгч олдсонгүй.` });
  }

  try {
    const user = await User.findByIdAndDelete(id);
    res.status(200).json({ message: `${id} тэй хэрэглэгч устгагдлаа`, user });
  } catch (error) {
    res.status(400).json({ message: "Алдаа", error: error.message });
  }
};

module.exports = { createUser, getAllUsers, getUser, updateUser, deleteUser };
