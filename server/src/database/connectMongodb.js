import mongoose from "mongoose";

const connectMongodb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {});
    console.log("database connection successfull");
  } catch (e) {
    console.log("could not connect to the server");
  }
};
export default connectMongodb;
