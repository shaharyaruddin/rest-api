require("dotenv").config();
const express = require("express");
const FileUpload = require("../Express/models/fileUpload");
const connectDB = require("../Express/DB/db_connection");
const cloudinary = require("cloudinary").v2;
const fileUpload = require("express-fileupload");

const router = express.Router();
const app = express();

connectDB();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// Middleware
app.use(express.json());
router.use(fileUpload({ useTempFiles: true }));

router.post("/uploads", async (req, res) => {
  try {
    if (!req.files) {
      return res.status(400).json({ error: "No files uploaded" });
    }

    const file = req.files.photo;
    const result = await cloudinary.uploader.upload(file.tempFilePath);
    console.log("result", result);

    const { name } = req.body;

    const newFile = new FileUpload({
      filePath: result.secure_url,
      name,
    });

    await newFile.save();
    return res.status(200).json({ message: "File uploaded Succssfully" });
  } catch (err) {
    console.error("Internal Server Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/city", async (req, res) => {
  try {
    const city = await FileUpload.find();
    res.json(city);
  } catch (error) {
    console.error("Data fetching error:", error);
    return res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
