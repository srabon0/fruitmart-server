const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 5000;
require("dotenv").config();
const app = express();
app.use(cors());
app.use(express.json());
const { connectToServer } = require("./utils/dbConnect");
const fruitsRoutes = require("./routes/v1/fruits.route.js");

connectToServer((err) => {
  if (!err) {
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  } else {
    console.log(err);
  }
});

app.use("/api/v1/fruits", fruitsRoutes);

app.all("*", (req, res) => {
  res.send("NO route found.");
});