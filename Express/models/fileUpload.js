const mongoose = require("mongoose");

const FileUpload = mongoose.Schema({
  filePath: String,
  name: String,
});

module.exports = mongoose.model("file", FileUpload);
