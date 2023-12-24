import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import db from "./config/db.js";
import { v2 as cloudinary } from "cloudinary";

import productRoute from "./routes/productRoute.js";
import userRoute from "./routes/userRoute.js";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
const port = 8080;

const app = express();
app.use(cors());
// app.use(express.json({ limit: "30mb" }));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cookieParser());

app.use("/", productRoute);
app.use(userRoute);
db();

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
