const mongoose = require("mongoose");

const connectDB = async (dbUrl) => {
  try {
    const db = await mongoose.connect(dbUrl);
    console.log(`MongoDB -тэй холбогдлоо ${db.connection.host}`.magenta);
  } catch (err) {
    console.log("MongoDB -тэй холбогдkh үед алдаа гарлаа: ", err);
  }
};

module.exports = connectDB;
