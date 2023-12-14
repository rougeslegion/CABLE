const express = require("express");
const app = express();
const port = process.env.port || 4000;

const cors = require("cors");
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

const search = require("./routes/search");

app.use(express.json());
app.use("/search", search);

//endpoints that start with /things

app.get("/", (req, res) => {
  //handle root
  res.send("dashboard");
});

app.listen(port, (err) => {
  if (err) {
    return console.log("ERROR", err);
  }
  console.log(`Listening on port ${port}`);
});
