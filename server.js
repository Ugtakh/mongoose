const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const colors = require("colors");
const cors = require("cors");

const connectDB = require("./config/mongoDB");
const logger = require("./middlewares/logger");
const upload = require("./middlewares/upload");

const userRoutes = require("./Routes/userRoutes");

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
