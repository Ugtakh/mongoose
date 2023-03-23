const jwt = require("jsonwebtoken");

const checkRole = (req, res, next) => {
  if (!req.headers.authorization) {
    res.status(400).json({ message: "Token явуулаагүй байна." });
  }
  console.log("BT", req.headers.authorization);
  const token = req.headers.authorization.split(" ")[1];
  const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
  console.log(user);
  if (user.role !== "Admin") {
    res.status(400).json({ message: "Энэ үйлдлийг хийх эрх хүрэхгүй байна." });
  }
  next();
};

module.exports = checkRole;
