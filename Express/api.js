const express = require("express");
const connectDB = require("./DB/db_connection");
const Developer = require("./models/developer");

const app = express();

connectDB();

app.use(express.json());

app.post("/developer", async (req, res) => {
  try {
    const { name, position, salary } = req.body

    const developer = new Developer({
      name,
      position,
      salary,
    });

    const user = await developer.save();
    res.json(user);
  } catch (err) {
    console.error("data fetching error", err);
    res.status(500).send("Server error");
  }
});

app.listen(3000);
