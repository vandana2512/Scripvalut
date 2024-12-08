import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    mobileNumber: {
      type: Array,
    },
    gender: {
      type: String,
      default: "",
    },
    dob: {
      type: String,
      default: "",
    },
    address: {
      type: Array,
      default: [],
    },
    walletbalance: {
      type: Number,
      default: 100000,
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
