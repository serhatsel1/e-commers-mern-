import mongoose from "mongoose";

const db = () => {
  mongoose
    .connect(process.env.DB_URI, {})
    .then(() => {
      console.log("MongoDB Connected !!");
    })
    .catch((err) => {
      console.log("DB Err -->", err);
    });
};

export default db;
