const express = require("express");
const cors = require("cors");
const app = express();

// routing
app.use(cors());
app.use(express.json());

app.post("/reminders", (req, res) => {
  console.log(req.body);
  res.send(req.body);
});

// initialise server
app.listen(3000, () => {
  console.log("listening...");
});
