import { createSlice } from "@reduxjs/toolkit";

const StockDetailSlice = createSlice({
  name: "stocks",
  initialState: {
    indices: [],
    fiftyTwoWeekHighData: [],
    fiftyTwoWeekLowData: [],
    top_gainers: [],
    top_losers: [],
    CurrentStockData: [],
    error: false,
    isLoading: true,
    livePrice: 0,
  },
  reducers: {
    GetIndicesStart: (state, action) => {
      state.isLoading = true;
    },
    GetIndicesSuccess: (state, action) => {
      state.isLoading = false;
      state.indices = action.payload;
    },
    GetIndicesFailed: (state, action) => {
      state.isLoading = false;
      state.error = true;
    },

    GetTopGainnersStart: (state, action) => {
      state.isLoading = true;
    },
    GetTopGainersSuccess: (state, action) => {
      state.isLoading = false;
      state.error = false;
      state.top_gainers = action.payload;
    },
    GetTopGainersFailure: (state, action) => {
      (state.isLoading = false), (state.error = true);
    },
    GetTopLosersStart: (state, action) => {
      state.isLoading = true;
    },
    GetTopLosersSuccess: (state, action) => {
      state.isLoading = false;
      state.error = false;
      state.top_losers = action.payload;
    },
    GetTopLosersFailure: (state, action) => {
      state.isLoading = false;
      state.error = true;
    },

    GetFiftyTwoWeekHighStart: (state, action) => {
      state.isLoading = true;
    },
    GetFiftyTwoWeekHighSuccess: (state, action) => {
      state.isLoading = false;
      state.error = false;
      state.fiftyTwoWeekHighData = action.payload;
    },
    GetFiftyTwoweekHighFailed: (state, action) => {
      state.isLoading = false;
      state.error = true;
    },
    GetFiftyTwoWeekLowStart: (state, action) => {
      state.isLoading = true;
    },
    GetFiftyTwoWeekLowSuccess: (state, action) => {
      state.isLoading = false;
      state.error = false;
      state.fiftyTwoWeekLowData = action.payload;
    },
    GetFiftyTwoWeeLowFailed: (state, action) => {
      state.isLoading = false;
      state.error = true;
    },

    GetCurrentStockStarted: (state, action) => {
      state.isLoading = true;
      state.CurrentStockData = [];
    },

    GetCurrentStockSuccess: (state, action) => {
      state.isLoading = false;
      state.CurrentStockData = action.payload;
      state.error = false;
    },

    GetCurrentStockFailed: (state, action) => {
      state.isLoading = false;
      state.error = true;
    },
    SetLivePrice: (state, action) => {
      state.livePrice = action.payload;
    },
  },
});

export const {
  GetIndicesStart,
  GetIndicesSuccess,
  GetIndicesFailed,
  GetTopGainnersStart,
  GetTopGainersSuccess,
  GetTopGainersFailure,
  GetTopLosersStart,
  GetTopLosersFailure,
  GetTopLosersSuccess,
  GetFiftyTwoWeekHighStart,
  GetFiftyTwoWeekHighSuccess,
  GetFiftyTwoweekHighFailed,
  GetFiftyTwoWeekLowStart,
  GetFiftyTwoWeekLowSuccess,
  GetFiftyTwoWeeLowFailed,
  GetCurrentStockStarted,
  GetCurrentStockSuccess,
  GetCurrentStockFailed,
  SetLivePrice,
} = StockDetailSlice.actions;

export default StockDetailSlice.reducer;
