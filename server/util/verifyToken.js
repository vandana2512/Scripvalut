import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const authorize = req.headers.token;

  if (!authorize) {
    return res.status(401).json("Token is missing, You are not authorize");
  }

  const token = authorize.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) return res.status(err).json("Token is invalid");

    req.user = user;
    next();
  });
};

export const verifyTokenandUser = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(401).json("You are authorized");
    }
  });
};

export const verifyTokenandAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(401).json("You are authorized");
    }
  });
};
