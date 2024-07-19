const jwt = require("jsonwebtoken");
const { secretKey } = require("../config/auth");

exports.verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res
      .status(403)
      .json({ success: false, message: "Token is not provided" });
  }
  jwt.verify(token.split(" ")[1], secretKey, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized access" });
    }
    req.user_mail = decoded.user_mail;
    next();
  });
};
