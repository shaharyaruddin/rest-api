require("dotenv").config();
const express = require("express");
const connectDB = require("./Express/DB/db_connection");
const city = require("./Routes/city");
const fileUpload = require("express-fileupload");
const PORT = process.env.PORT || 2000;

const app = express();

connectDB();


// Use Routes
app.use(city);

app.get("/", (req, res) => {
  res.send("Welcome to the FoodPanda Backend API!");
});
app.listen(PORT, () => {
  console.log(`running on ${PORT}`);
});

module.exports = app;
