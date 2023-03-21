const error = (err, req, res, next) => {
  console.log("ERROR HANDLER", err);

  if (err.name === "CastError") {
    err.statusCode = 400;
    err.message = "Буруу бүтэцтэй ID байна.";
  }

  res.status(err.statusCode || 500).json({ message: err.message });
};

module.exports = error;
