const mongoose = require("mongoose");
require("dotenv").config();

const PASSWORD = process.env.PASSWORD;

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://sheheryar:${PASSWORD}@cluster0.ami0p.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
    );
    console.log('DB connected')
  } catch (err) {
    console.log("DB is not connected", err);
  }
};

module.exports = connectDB;
