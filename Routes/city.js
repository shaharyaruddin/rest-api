require("dotenv").config();
const express = require("express");
const FileUpload = require("../Express/models/fileUpload");
const connectDB = require("../Express/DB/db_connection");
const multer = require("multer");
const router = express.Router();

const app = express();

const PORT = process.env.PORT || 2000;

connectDB();
app.use(express.json());

const fileUpload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, "uploads");
    },
    filename: function (req, file, callback) {
      const uniqueName = file.fieldname + "-" + Date.now() + ".jpg";
      callback(null, uniqueName);
    },
  }),
}).single("my_file");

router.post("/uploads", fileUpload, async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send("No files..");
    }

    const { name } = req.body;

    const newFile = new FileUpload({
      filePath: req.file.path,
      name,
    });

    await newFile.save();
    res.send("File uploaded Succssfully").catch((err) => {
      res.send("fetcing error in file", err);
    });
  } catch (err) {
    res.status(500).send("Internal Server Error", err);
  }
});

router.get("/city", async (req, res) => {
  try {
    const city = await FileUpload.find();
    res.json(city);
  } catch (err) {
    console.error("data fetching error", error);
    res.status(400).send("Server error ");
  }
});

module.exports = router;
