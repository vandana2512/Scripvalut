import { createSlice } from "@reduxjs/toolkit";

const user = JSON.parse(localStorage.getItem("user"));

const UserSlice = createSlice({
  name: "user",
  initialState: {
    userid: user?._id || "",
    name: user?.name || "",
    username: user?.username || "",
    email: user?.email || "",
    mobileNumber: user?.mobileNumber || [],
    address: user?.address || [],
    error: false,
    isLoading: false,
    errorList: [],
    serverMessage: "",
  },

  reducers: {
    RegisterUserStart: (state, action) => {
      state.isLoading = true;
    },

    RegisterUserSuccess: (state, action) => {
      state.isLoading = false;
      state.error = false;
      state.serverMessage = action.payload;
    },

    RegisterUserFailed: (state, action) => {
      state.error = true;
      state.errorList = action.payload;
      state.isLoading = false;
    },

    LoginUserStart: (state, action) => {
      state.isLoading = true;
    },

    LoginUserSuccess: (state, action) => {
      state.isLoading = false;
      state.error = false;
      state.userid = action.payload._id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.username = action.payload.username;
      state.address = action.payload.address;
      state.mobileNumber = action.payload.mobileNumber;
    },

    LoginUserFailed: (state, action) => {
      state.error = true;
      state.errorList = action.payload;
      state.isLoading = false;
    },

    ClearErrorList: (state, action) => {
      state.errorList = [];
    },

    PassowordResetEmailStart: (state, action) => {
      state.isLoading = true;
    },

    PassowordResetEmailSuccess: (state, action) => {
      state.isLoading = false;
      state.error = false;
      state.serverMessage = action.payload;
    },
    PassowordResetEmailFailed: (state, action) => {
      state.isLoading = false;
      state.errorList = action.payload;
      state.error = true;
    },

    ResetPasswordStarted: (state, action) => {
      state.isLoading = true;
    },
    ResetPasswordSuccess: (state, action) => {
      state.isLoading = false;
      state.error = false;
      state.serverMessage = action.payload;
    },
    ResetPasswordFailed: (state, action) => {
      state.isLoading = false;
      state.errorList = action.payload;
      state.error = true;
    },
  },
});

export const {
  RegisterUserStart,
  RegisterUserSuccess,
  RegisterUserFailed,
  LoginUserStart,
  LoginUserSuccess,
  LoginUserFailed,
  ClearErrorList,
  PassowordResetEmailStart,
  PassowordResetEmailSuccess,
  PassowordResetEmailFailed,
  ResetPasswordStarted,
  ResetPasswordSuccess,
  ResetPasswordFailed,
} = UserSlice.actions;

export default UserSlice.reducer;
