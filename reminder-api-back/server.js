const express = require("express");
const cors = require("cors");
const fs = require("fs");
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
  req.body.id = uuidv4();
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

  // #### remove the element from the array whose id matches the url parameter
  // read and decode into js
  const rawData = fs.readFileSync("./data/data.json");
  const data = JSON.parse(rawData);

  // filter the data.reminders array, creating a shallow copy that only has all the reminders except the on to be deleted
  const filteredRemindersArray = data.reminders.filter((reminder) => {
    return reminder.id != req.params.id;
  });

  // overwrite the original data.reminders array with the copy that is missing the deleted reminder
  data.reminders = filteredRemindersArray;

  // now we can save the modified data back into the json file.
  const newJson = JSON.stringify(data);
  fs.writeFileSync("./data/data.json", newJson);

  // send back a string that says "deleted: <id of deleted reminder>"
  res.send("deleted: " + req.params.id);
});

app.listen(3000, () => {
  console.log("listening...");
});
