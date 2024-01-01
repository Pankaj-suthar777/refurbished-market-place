const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
require("dotenv").config();
const dbConfig = require("./config/dbConfig");

app.listen(port, () =>
  console.log(`Node/Express Server is Listing to port ${port}`)
);
