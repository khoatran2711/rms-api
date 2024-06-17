import mongoose from "mongoose";
import { env } from "process";

export const connectDB = () => {
  // const MonngoUrl = "mongodb://localhost:27017/blankDB";
  console.log(env.SECRET_KEY)
  const MonngoUrl = env.DB_HOST+env.DB_PORT+env.DB_NAME;
  mongoose.Promise = Promise;
  mongoose.connect(MonngoUrl);
  mongoose.connection.on("Error", (error: Error) => {
    console.log(error);
  });
};
