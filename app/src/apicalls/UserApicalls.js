import { useNavigate } from "react-router-dom";
import { publicRequest } from "../apiRequest";
import {
  ClearErrorList,
  LoginUserFailed,
  LoginUserStart,
  LoginUserSuccess,
  PassowordResetEmailFailed,
  PassowordResetEmailStart,
  PassowordResetEmailSuccess,
  RegisterUserFailed,
  RegisterUserStart,
  RegisterUserSuccess,
  ResetPasswordFailed,
  ResetPasswordStarted,
  ResetPasswordSuccess,
} from "../redux/UserSlice";

export const RegisterUser = async (dispatch, user) => {
  dispatch(ClearErrorList());
  dispatch(RegisterUserStart());

  try {
    const res = await publicRequest.post("/user_auth/user_register", user);

    if (res?.status == 200) {
      dispatch(RegisterUserSuccess("user registered"));
      window.location.href = "/login";
    }
  } catch (e) {
    if (e.message === "Network Error") {
      dispatch(
        RegisterUserFailed([
          { path: "serverError", msg: "Please check internet connection" },
        ])
      );
      return;
    }

    if (e.response.status === 403) {
      dispatch(RegisterUserFailed([...e.response.data.error]));
    } else if (e.response.status === 422) {
      dispatch(RegisterUserFailed(e.response.data.error));
    } else {
      dispatch(
        RegisterUserFailed([
          { path: "serverError", msg: "Something went wrong" },
        ])
      );
    }
  }
};

export const LoginUser = async (dispatch, user) => {
  dispatch(ClearErrorList());
  dispatch(LoginUserStart());

  try {
    const res = await publicRequest.post("/user_auth/user_login", user);

    if (res.status == 200) {
      dispatch(LoginUserSuccess(res.data));

      const { accessToken, refreshToken, ...others } = res.data;

      localStorage.setItem("user", JSON.stringify({ ...others }));

      localStorage.setItem("accessToken", accessToken);

      localStorage.setItem("refreshToken", refreshToken);
    }
  } catch (e) {
    if (e.message === "Network Error") {
      dispatch(
        RegisterUserFailed([
          { path: "serverError", msg: "Please check internet connection" },
        ])
      );
      return;
    }

    if (e.response.status === 404) {
      dispatch(LoginUserFailed([{ path: "username", msg: e.response.data }]));
    } else if (e.response.status === 422) {
      console.log(e);
      dispatch(LoginUserFailed(e.response.data.error));
    } else if (e.response.status === 401) {
      console.log(e);
      dispatch(LoginUserFailed([{ path: "password", msg: e.response.data }]));
    } else {
      console.log(e);
      dispatch(
        LoginUserFailed([{ path: "serverError", msg: "Something went wrong" }])
      );
    }
  }
};

export const PasswordReset = async (dispatch, email) => {
  dispatch(ClearErrorList());
  dispatch(PassowordResetEmailStart());

  try {
    const res = await publicRequest.post("/user_auth/forgotpassword", {
      email,
    });

    console.log(res);

    if (res.status === 201) {
      dispatch(PassowordResetEmailSuccess(res.data.msg));
    }
  } catch (e) {
    if (e.response.status === 404) {
      dispatch(
        PassowordResetEmailFailed([{ path: "email", msg: e.response.data }])
      );
    } else {
      console.log(e.response.data.error);
      dispatch(PassowordResetEmailFailed(e.response.data.error));
    }
  }
};

export const ResetPassword = async (dispatch, password, token) => {
  dispatch(ClearErrorList());

  dispatch(ResetPasswordStarted());

  try {
    const res = await publicRequest.post("/user_auth/resetpassword", {
      refreshToken: token,
      password,
    });

    if (res.status === 200) {
      dispatch(ResetPasswordSuccess(res.data.msg));
    }
  } catch (e) {
    if (e.response.status === 404) {
      dispatch(
        ResetPasswordFailed([{ path: "password", msg: e.response.data }])
      );
    } else {
      dispatch(ResetPasswordFailed(e.response.data.error));
    }
  }
};
