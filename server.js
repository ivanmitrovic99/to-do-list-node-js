const mongoose = require("mongoose");
require("dotenv").config();

const app = require("./app");

const DB = process.env.DATABASE_CONNECTION_STRING.replace("<password>", process.env.DATABASE_PASSWORD);

mongoose.connect(DB).then(() => console.log("Database connection successfull"));

const port = process.env.PORT;

const server = app.listen(port, () => console.log(`App running on ${port}`));
