const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../config/db");
const { secretKey, tokenExpiration } = require("../config/auth");

function generateToken(user) {
  return jwt.sign(
    { user_mail: user.user_mail, user_name: user.user_name },
    secretKey,
    { expiresIn: tokenExpiration }
  );
}

exports.login = (req, res) => {
  const { user_mail, user_password } = req.body;
  const query = `SELECT * FROM user WHERE user_mail = ?`;
  db.query(query, [user_mail], (err, results) => {
    if (err) {
      console.error("Error fetching user:", err);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
    if (results.length === 1) {
      const user = results[0];
      const hashedPassword = user.user_password;
      bcrypt.compare(user_password, hashedPassword, (err, result) => {
        if (err) {
          console.error("Error comparing passwords:", err);
          return res
            .status(500)
            .json({ success: false, message: "Internal server error" });
        }
        if (result) {
          const token = generateToken(user);
          res.json({
            success: true,
            message: "Login successful",
            token: token,
            user_name: user.user_name,
          });
        } else {
          res
            .status(401)
            .json({ success: false, message: "Invalid email or password" });
        }
      });
    } else {
      res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }
  });
};

exports.signup = (req, res) => {
  const { user_name, user_mail, user_password } = req.body;
  bcrypt.hash(user_password, 10, (err, hash) => {
    if (err) {
      console.error("Error hashing password:", err);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
    const query = `INSERT INTO user (user_name, user_mail, user_password) VALUES (?, ?, ?)`;
    db.query(query, [user_name, user_mail, hash], (err, results) => {
      if (err) {
        console.error("Error signing up:", err);
        return res
          .status(500)
          .json({ success: false, message: "Failed to create user" });
      }
      const token = generateToken({ user_mail, user_name });
      res.json({
        success: true,
        message: "Signup successful",
        token: token,
        user_name: user_name,
      });
    });
  });
};

exports.checkEmail = (req, res) => {
  const { user_mail } = req.body;
  const query = `SELECT user_mail FROM user WHERE user_mail = ?`;
  db.query(query, [user_mail], (err, results) => {
    if (err) {
      console.error("Error checking email:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    if (results.length > 0) {
      res.json({ available: false });
    } else {
      res.json({ available: true });
    }
  });
};
