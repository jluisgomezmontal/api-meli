const express = require("express");
const routes = require("./src/routes");
const bodyParser = require("body-parser");
const cors = require("cors");

// crear server

const app = express();

// app routes
app.use("/", routes());
app.use(cors());

// port

const PORT = process.env.PORT || 4000;
app.listen(PORT);
