import mongoose from "mongoose";

const Connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected successfully");
  } catch (e) {
    console.log("MongoDB connection failed",e);
  }
};

export default Connect;
