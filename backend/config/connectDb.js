import mongoose from "mongoose";
const connectDb = async () => {

  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("DB connected successfully");
  } catch (error) {
    console.error("Database error:");
    console.error(error);
  }
};
export default connectDb;
