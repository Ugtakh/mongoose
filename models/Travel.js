const mongoose = require("mongoose");

const travelSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    maxlength: [500, "Тайлбар хамгийн ихдээ 500 тэмдэгтээс ихгүй байна."],
  },
  travelImg: { type: String },
  travelPrice: Number,
  travelDay: Number,
  travelLocation: String,
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
});

const travel = mongoose.model("Travel", travelSchema);

module.exports = travel;
