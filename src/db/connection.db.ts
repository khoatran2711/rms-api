import mongoose from "mongoose";

export const connectDB = () => {
  const MonngoUrl = "mongodb://localhost:27017/blankDB";
  mongoose.Promise = Promise;
  mongoose.connect(MonngoUrl);
  mongoose.connection.on("Error", (error: Error) => {
    console.log(error);
  });
};
