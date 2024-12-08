import mongoose, { model } from "mongoose";

const MutualFundSchema = new mongoose.Schema(
  {
    userid: {
      type: String,
      required: true,
    },
    fundName: {
      type: String,
      required: true,
    },
    units: {
      type: Number,
      required: true,
    },
    schemetype: {
      type: String,
      required: true,
    },
    investedAmount: {
      type: Number,
      required: true,
    },
    nav: {
      type: Number,
      require: true,
    },
    status: {
      type: String,
      enum: ["Active", "Sold", "Pending", "Watchlist"],
    },
    code: {
      type: Number,
      require: true,
    },
    frequency: {
      type: String,
    },
    sipdate: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("MutualFund", MutualFundSchema);
