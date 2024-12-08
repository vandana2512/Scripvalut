import { createSlice } from "@reduxjs/toolkit";

const MutualFundSlice = createSlice({
  name: "mutualFund",
  initialState: {
    MFList: JSON.parse(sessionStorage.getItem("Mflist")) || [],
    currentMF: {},
    error: false,
    isLoading: false,
    openpopup: false,
    Investtype: "",
    sipdate: "",
    frequency: "",
  },
  reducers: {
    GetMFListStarted: (state, action) => {
      state.isLoading = true;
    },
    GetMFListSuccess: (state, action) => {
      (state.isLoading = false),
        (state.MFList = action.payload),
        (state.error = false);
    },
    GetMFListFailed: (state, action) => {
      (state.isLoading = true), (state.error = true);
    },

    GetCurrentMFStarted: (state, action) => {
      state.isLoading = true;
    },
    GetCurrentMFSuccess: (state, action) => {
      state.isLoading = false;
      state.currentMF = action.payload;
      state.error = false;
    },
    GetCurrentMFFailed: (state, action) => {
      state.isLoading = false;
      state.error = true;
    },
    SetopenPopup: (state, action) => {
      if (state.openpopup === true) {
        state.openpopup = false;
        if (action.payload) {
          state.type = action.payload;
        }
      } else if (state.openpopup === false) {
        state.openpopup = true;
        if (action.payload) {
          state.type = action.payload;
        }
      }
    },
    SetSIPDate: (state, action) => {
      state.sipdate = action.payload;
    },
    SetSipFrequncy: (state, action) => {
      state.frequency = action.payload;
    },
  },
});

export const {
  GetMFListStarted,
  GetMFListSuccess,
  GetMFListFailed,
  GetCurrentMFStarted,
  GetCurrentMFSuccess,
  GetCurrentMFFailed,
  SetopenPopup,
  SetSIPDate,
  SetSipFrequncy,
} = MutualFundSlice.actions;

export default MutualFundSlice.reducer;
