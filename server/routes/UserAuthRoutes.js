import express from "express";
import {
  ForgotPassword,
  LoginUser,
  RefreshToken,
  RegisterUser,
  ResetPassword,
  UpdateUser,
  UserLogout,
} from "../controllers/UserAuth.js";
import {
  UserLoginValidator,
  UserPasswordValidator,
  UserRegisterValidator,
  UserResetEmailValidator,
} from "../util/validation.js";
import { verifyTokenandUser } from "../util/verifyToken.js";

const router = express.Router();

//User Regisiter

router.post("/user_register", UserRegisterValidator, RegisterUser);

//User Login

router.post("/user_login", UserLoginValidator, LoginUser);

//Refresh Token

router.post("/refreshToken", RefreshToken);

//Forgotpassword

router.post("/forgotpassword", UserResetEmailValidator, ForgotPassword);

//Reser Password

router.post("/resetPassword", UserPasswordValidator, ResetPassword);

//User Logout

router.post("/user_logout/:id", UserLogout);

//Update User

router.post("/user_update/:id", UpdateUser);

export default router;
