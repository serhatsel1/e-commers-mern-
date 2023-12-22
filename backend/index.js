import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import db from "./config/db.js";

import productRoute from "./routes/productRoute.js";

dotenv.config();

const port = 3000;

const app = express();
app.use(cors());
// app.use(express.json({ limit: "30mb" }));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cookieParser());

app.use("/", productRoute);

db();

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
