const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dn78df09z",
  api_key: "158167546622352",
  api_secret: "K_K3fYSFWuVk2N2aejtlT3WTc5k",
});

module.exports = cloudinary;
