const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const colors = require("colors");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

const connectDB = require("./config/mongoDB");
const logger = require("./middlewares/logger");

const userRoutes = require("./Routes/userRoutes");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const fileExt = path.extname(file.originalname);
    const fileName = Math.floor(Math.random() * 1_000_000).toString(16);
    cb(null, `${fileName}${fileExt}`);
  },
});

const upload = multer({ storage: storage });

const PORT = process.env.PORT;
const dbUrl = process.env.DATABASE_URI;

// instance of express
const app = express();
//middlewares
app.use(cors());
app.use(express.json());
app.use(logger);
app.use("/uploads", express.static("uploads"));

app.use("/users", userRoutes);

app.get("/", async (req, res) => {
  res.json({ message: "Сайн байна уу." });
});

app.post("/upload", upload.single("image"), (req, res) => {
  console.log("REQ:", req.file);
  res.status(200).json({
    message: "Амжилттай хадгаллаа.",
    imgUrl: `${req.protocol}://${req.hostname}:${PORT}/${req.file.path}`,
  });
});

console.log(
  `-------------------------------------------------------------------`.yellow
);
connectDB(dbUrl);
app.listen(PORT, () => {
  console.log(`Сервер ${PORT} порт дээр аслаа`.rainbow);
});
