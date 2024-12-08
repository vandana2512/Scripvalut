import mongoose, { model } from "mongoose";

const StockSchema = new mongoose.Schema(
  {
    userid: {
      type: String,
      required: true,
    },

    symbol: {
      type: String,
    },
    stockname: {
      type: String,
    },
    investedPrice: {
      type: Number,
    },
    marketPrice: {
      type: Number,
    },
    quantity: {
      type: Number,
    },
    status: {
      type: String,
      enum: ["Active", "Sold", "Pending", "Watchlist"],
    },
    industry: {
      type: String,
    },
    sector: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Stock", StockSchema);
