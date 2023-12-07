const mongoose = require("mongoose");
require("dotenv").config();

const app = require("./app");

mongoose.connect(process.env.MONGO_URI).then(() => console.log("Database connection successfull"));

const port = process.env.PORT || 3000;

const server = app.listen(port, () => console.log(`App running on ${port}`));
