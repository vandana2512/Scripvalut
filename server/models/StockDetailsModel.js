import mongoose from "mongoose";

const StockListSchema = new mongoose.Schema({});

export default mongoose.model("stockdetails", StockListSchema);
