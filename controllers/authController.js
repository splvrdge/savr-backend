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

exports.login = async (req, res) => {
  const { user_mail, user_password } = req.body;
  const query = `SELECT * FROM user WHERE user_mail = ?`;

  try {
    const [results] = await db.query(query, [user_mail]);

    if (results.length === 1) {
      const user = results[0];
      const hashedPassword = user.user_password;
      const isPasswordMatch = await bcrypt.compare(
        user_password,
        hashedPassword
      );

      if (isPasswordMatch) {
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
    } else {
      res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.signup = async (req, res) => {
  const { user_name, user_mail, user_password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(user_password, 10);
    const query = `INSERT INTO user (user_name, user_mail, user_password) VALUES (?, ?, ?)`;
    const [results] = await db.query(query, [
      user_name,
      user_mail,
      hashedPassword,
    ]);

    const token = generateToken({ user_mail, user_name });
    res.json({
      success: true,
      message: "Signup successful",
      token: token,
      user_name: user_name,
    });
  } catch (err) {
    console.error("Error signing up:", err);
    res.status(500).json({ success: false, message: "Failed to create user" });
  }
};

exports.checkEmail = async (req, res) => {
  const { user_mail } = req.body;
  const query = `SELECT user_mail FROM user WHERE user_mail = ?`;

  try {
    const [results] = await db.query(query, [user_mail]);

    if (results.length > 0) {
      res.json({ available: false });
    } else {
      res.json({ available: true });
    }
  } catch (err) {
    console.error("Error checking email:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
