const express = require("express");
const cors = require("cors");
const fs = require("fs");

// NEW! Add this package with npm install uuid
// it allows the generation of unique id strings
const { v4: uuidv4 } = require("uuid");

const app = express();
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
  // read
  const rawData = fs.readFileSync("./data/data.json");
  const data = JSON.parse(rawData);
  // modify
  // NEW! This adds an id property to the payload that was sent in the request. The value is set to what the uuidv4() function returns, which is a long unique string that we will use as the id. This id is needed so that when we delete a reminder we can identify which one to remove from the array.
  req.body.id = uuidv4();
  // after an id is added to the new reminder object, we add it to the reminders array and resave it to the file.
  data.reminders.push(req.body);
  // write
  const newJson = JSON.stringify(data);
  fs.writeFileSync("./data/data.json", newJson);

  res.send(req.body);
});

// NEW! this endpoint matches with DELETE requests to /reminders/:id, where :id is anything. This is called a URL parameter, or dynamic url segment
app.delete("/reminders/:id", (req, res) => {
  // we can access whatever was in the url where :id is, right after reminder, by access request.params
  console.log(req.params.id);

  // send back a string that says "deleted: <id of deleted reminder>"
  res.send("deleted: " + req.params.id);
});

app.listen(3000, () => {
  console.log("listening...");
});
