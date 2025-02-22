const express = require("express");
const connectDB = require("./DB/db_connection");
const Employees = require("./models/employee");
const app = express()

connectDB();

app.get("/abc", async (req, res) => {
  try {
    const employees = await Employees.find();
    res.json(employees);
  } catch (err) {
    console.error("error in employee API", err);
    res.status(500).send('server err')
  }
});

app.listen(3000);






