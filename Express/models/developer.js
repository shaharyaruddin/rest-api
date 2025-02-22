const mongoose = require("mongoose");

const newDeveloper = mongoose.Schema({
  name: String,
  position: String,
  salary: Number,
});

module.exports = mongoose.model("devs", newDeveloper);
