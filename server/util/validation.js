import { check, validationResult } from "express-validator";

const manageErrors = (cb) => (req, res, next) => {
  const error = validationResult(req);

  if (error.isEmpty()) {
    return next();
  }

  cb(error.array(), req, res);
};

export const UserRegisterValidator = [
  check("name").notEmpty().withMessage("Name is required").trim().escape(),
  check("username")
    .notEmpty()
    .withMessage("Username is required")
    .trim()
    .escape(),
  check("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email should be valid")
    .trim()
    .escape(),
  check("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password length must be minimum 6 char")
    .trim()
    .escape(),
  manageErrors((error, req, res) => res.status(422).json({ error })),
];

export const UserLoginValidator = [
  check("username")
    .notEmpty()
    .withMessage("Username is required")
    .trim()
    .escape(),
  check("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password length must be min 6 char")
    .trim()
    .escape(),
  manageErrors((error, req, res) => res.status(422).json({ error })),
];

export const UserResetEmailValidator = [
  check("email").notEmpty().withMessage("Email is required").trim().escape(),
  manageErrors((error, req, res) => res.status(422).json({ error })),
];

export const UserPasswordValidator = [
  check("password")
    .notEmpty()
    .withMessage("Password is required")
    .trim()
    .escape(),
  manageErrors((error, req, res) => res.status(422).json({ error })),
];
