const Travel = require("../models/Travel");

const getAllTravels = async (req, res, next) => {
  try {
    const travels = await Travel.find().populate("category");

    res.status(201).json({ message: "Амжилттай аялалууд олдлоо.", travels });
  } catch (err) {
    next(err);
  }
};

const createTravel = async (req, res, next) => {
  const {
    title,
    desctiption,
    travelImg,
    travelPrice,
    travelDay,
    travelLocation,
    category,
  } = req.body;

  try {
    const travel = await Travel.create({
      title,
      desctiption,
      travelImg,
      travelPrice,
      travelDay,
      travelLocation,
      category,
    });

    res.status(201).json({ message: "Амжилттай аялал үүсгэлээ.", travel });
  } catch (err) {
    next(err);
  }
};

module.exports = { createTravel, getAllTravels };
