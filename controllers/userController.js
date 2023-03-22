const User = require("../models/User");

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    if (!users) {
      res.status(200).json({ message: "Хэрэглэгчдийн мэдээлэл хоосон байна." });
    }

    res.status(201).json({ message: "Хэрэглэгчдийн мэдээлэл олдлоо.", users });
  } catch (error) {
    next(error);
  }
};

const createUser = async (req, res, next) => {
  const { name, email, password, profileImg } = req.body;

  try {
    if (!name || !email || !password) {
      res
        .status(400)
        .json({ message: "Нэр, имэйл эсвэл нууц үг байхгүй байна." });
    }

    const user = await User.create({
      name,
      email,
      password,
      profileImg,
    });
    res.status(201).json({ message: "Амжилттай бүртгэгдлээ", user });
  } catch (err) {
    next(err);
  }
};

const getUser = async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({ message: `${id} -хоосон байна.` });
  }

  try {
    const user = await User.findById(`${id}`);
    if (!user) {
      res.status(400).json({ message: `${id} -тэй хэрэглэгч олдохгүй байна.` });
    }

    res.status(200).json({ message: `${id} тэй хэрэглэгч олдлоо`, user });
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({ message: `${id} -хоосон байна.` });
  }

  try {
    const user = await User.findByIdAndUpdate(id, req.body, { new: true });
    if (!user) {
      res.status(400).json({ message: `${id} -тэй хэрэглэгч олдсонгүй.` });
    }
    res.status(200).json({ message: `${id} тэй хэрэглэгч шинэчлэгдлээ`, user });
  } catch (error) {
    next(error);
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
    next(error);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.find({ email, password });
    console.log("user", user);
    if (!user.length) {
      res.status(400).json({ message: `Имэйл эсвэл нууц үг буруу байна` });
    }

    res.status(200).json({ message: `Амжилттай нэвтэрлээ`, user });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
  createUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
};
