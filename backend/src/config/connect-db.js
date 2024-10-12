import mongoose from "mongoose";

export const connectDB = () => {
  mongoose
    .connect(
      "mongodb+srv://okindosilva:CcWGZutKc1TFFq79@cluster0.92swd.mongodb.net/"
    )
    .then(() => {
      console.log("DB connected...");
    })
    .catch((err) => {
      console.log(err);
    });
};
