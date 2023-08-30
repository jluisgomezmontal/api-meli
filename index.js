import express from "express";
import routes from "./src/routes/index.js";
import cors from "cors";

// crear server

const app = express();

// app routes
app.use("/", routes());
app.use(cors());

// port

const PORT = process.env.PORT || 4000;
app.listen(PORT);
