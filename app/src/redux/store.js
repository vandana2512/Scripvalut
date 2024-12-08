import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./UserSlice";
import StockDetailSlice from "./StockDetailsSlice";
import MutualFundSlice from "./MutualFundSlice";

export const Store = configureStore({
  reducer: {
    users: UserSlice,
    stocks: StockDetailSlice,
    mutualFund: MutualFundSlice,
  },
});
