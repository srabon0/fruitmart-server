const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 5000;
require("dotenv").config();
const app = express();
app.use(cors({ origin:'https://fruit-mart-client.vercel.app/' , credentials :  true}));
app.use(express.urlencoded({extended:false}));
app.use(express.json({limit: '100mb'}));
app.set('view engine', 'ejs');
const { connectToServer } = require("./utils/dbConnect");
const fruitsRoutes = require("./routes/v1/fruits.route");
const userControl = require("./routes/v1/user.route");
const orderRoutes = require('./routes/v1/orders.route')
const paymentRoutes = require('./routes/v1/payment.route')
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
app.use("/api/v1/users", userControl);
app.use("/api/v1/orders", orderRoutes);
app.use("/payment",paymentRoutes);

app.all("*", (req, res) => {
  res.send("NO route found.");
});