const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.post("/reminders", (req, res) => {
  console.log("hello!");
  res.send("hello!");
});

app.listen(3000, () => {
  console.log("listening...");
});
