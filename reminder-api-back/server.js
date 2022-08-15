const express = require("express");
const cors = require("cors");
const app = express();
const fs = require("fs");
// routing
app.use(cors());
app.use(express.json());

app.get("/reminders", (req, res) => {
  // read data
  const rawData = fs.readFileSync("./data/data.json");

  // decode data
  const data = JSON.parse(rawData);

  // send decoded data
  res.json(data.reminders);
});

app.post("/reminders", (req, res) => {
  // read data
  const rawData = fs.readFileSync("./data/data.json");

  // decode data
  const data = JSON.parse(rawData);

  // modify data
  data.reminders.push(req.body);

  // encode data
  const newJson = JSON.stringify(data);

  // write data
  fs.writeFileSync("./data/data.json", newJson);

  res.send(req.body);
});

// initialise server
app.listen(3000, () => {
  console.log("listening...");
});
