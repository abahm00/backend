import mongoose from "mongoose";
export const dbConnection = mongoose
  .connect("mongodb://localhost:27017/ecommerce")
  .then(() => {
    console.log("connected");
  })
  .catch((err) => {
    console.log(err);
  });
