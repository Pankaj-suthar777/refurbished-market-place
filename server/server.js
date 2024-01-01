const express = require("express");
const app = express();

//to take request body from frontend
app.use(express.json());

require("dotenv").config();
const dbConfig = require("./config/dbConfig");
const port = process.env.PORT || 5000;

const usersRoute = require("./routes/usersRoute");

app.use("/api/users", usersRoute);

app.listen(port, () =>
  console.log(`Node/Express Server is Listing to port ${port}`)
);
