require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const path = require("path");
const CustomerRouter = require("./routes/customer.route");

const app = express();

// middlewares
app.use(cors());
app.use(express.static(path.join(__dirname,"../","public")));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/", CustomerRouter);


// page not found
app.get("*", (req, res) => {
  res.status(404).send("Page not found!");
});



module.exports = app;
