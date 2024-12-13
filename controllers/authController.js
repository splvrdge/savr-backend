const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../config/db");
const {
  secretKey,
  tokenExpiration,
  refreshTokenSecret,
  refreshTokenExpiration,
} = require("../config/auth");

function generateAccessToken(user) {
  return jwt.sign(
    {
      user_id: user.user_id,
      user_email: user.user_email,
      user_name: user.user_name,
    },
    secretKey,
    { expiresIn: tokenExpiration }
  );
}

function generateRefreshToken(user) {
  return jwt.sign({ user_id: user.user_id }, refreshTokenSecret, {
    expiresIn: refreshTokenExpiration,
  });
}

exports.login = async (req, res) => {
  const { user_email, user_password } = req.body;
  const query = `SELECT * FROM users WHERE user_email = ?`;

  try {
    const [results] = await db.execute(query, [user_email]);

    if (results.length === 1) {
      const user = results[0];
      const hashedPassword = user.user_password;
      const isPasswordMatch = await bcrypt.compare(
        user_password,
        hashedPassword
      );

      if (isPasswordMatch) {
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        // Calculate expiration date for refresh token
        const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

        // Begin transaction
        const connection = await db.getConnection();
        try {
          await connection.beginTransaction();

          // Revoke old tokens
          const revokeOldTokensQuery = `
            UPDATE tokens 
            SET is_revoked = TRUE 
            WHERE user_id = ? AND is_revoked = FALSE
          `;
          await connection.execute(revokeOldTokensQuery, [user.user_id]);

          // Insert new token
          const insertTokenQuery = `
            INSERT INTO tokens (user_id, refresh_token, expires_at)
            VALUES (?, ?, ?)
          `;
          await connection.execute(insertTokenQuery, [
            user.user_id,
            refreshToken,
            expiresAt
          ]);

          await connection.commit();

          res.json({
            success: true,
            message: "Login successful",
            accessToken,
            refreshToken,
            user_name: user.user_name,
            user_id: user.user_id
          });
        } catch (error) {
          await connection.rollback();
          throw error;
        } finally {
          connection.release();
        }
      } else {
        res.status(401).json({ success: false, message: "Invalid email or password" });
      }
    } else {
      res.status(401).json({ success: false, message: "Invalid email or password" });
    }
  } catch (err) {
    console.error("Error in login:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.signup = async (req, res) => {
  const { user_name, user_email, user_password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(user_password, 10);
    const query = `INSERT INTO users (user_name, user_email, user_password) VALUES (?, ?, ?)`;
    const [results] = await db.execute(query, [
      user_name,
      user_email,
      hashedPassword,
    ]);

    const user = {
      user_id: results.insertId,
      user_name,
      user_email,
    };

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // Calculate expiration date for refresh token
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

    // Begin transaction
    const connection = await db.getConnection();
    try {
      await connection.beginTransaction();

      // Insert new token
      const insertTokenQuery = `
        INSERT INTO tokens (user_id, refresh_token, expires_at)
        VALUES (?, ?, ?)
      `;
      await connection.execute(insertTokenQuery, [
        user.user_id,
        refreshToken,
        expiresAt
      ]);

      await connection.commit();

      res.json({
        success: true,
        message: "Signup successful",
        accessToken,
        refreshToken,
        user_name,
        user_id: user.user_id
      });
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  } catch (err) {
    console.error("Error signing up:", err);
    res.status(500).json({ success: false, message: "Failed to create user" });
  }
};

exports.refreshToken = async (req, res) => {
  const { refresh_token } = req.body;

  if (!refresh_token) {
    return res.status(401).json({ success: false, message: "Refresh token required" });
  }

  try {
    // Check if token exists and is not revoked
    const [tokens] = await db.execute(
      `SELECT * FROM tokens WHERE refresh_token = ? AND is_revoked = FALSE AND expires_at > NOW()`,
      [refresh_token]
    );

    if (tokens.length === 0) {
      return res.status(401).json({ success: false, message: "Invalid refresh token" });
    }

    const token = tokens[0];

    // Verify the refresh token
    const decoded = jwt.verify(refresh_token, refreshTokenSecret);
    const user_id = decoded.user_id;

    // Get user details
    const [users] = await db.execute(
      `SELECT * FROM users WHERE user_id = ?`,
      [user_id]
    );

    if (users.length === 0) {
      return res.status(401).json({ success: false, message: "User not found" });
    }

    const user = users[0];

    // Generate new tokens
    const accessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);

    // Update the token in database
    const connection = await db.getConnection();
    try {
      await connection.beginTransaction();

      // Revoke old token
      await connection.execute(
        `UPDATE tokens SET is_revoked = TRUE WHERE token_id = ?`,
        [token.token_id]
      );

      // Insert new token
      const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
      await connection.execute(
        `INSERT INTO tokens (user_id, refresh_token, expires_at) VALUES (?, ?, ?)`,
        [user_id, newRefreshToken, expiresAt]
      );

      await connection.commit();

      res.json({
        success: true,
        accessToken,
        refreshToken: newRefreshToken
      });
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  } catch (err) {
    console.error("Error in refresh token:", err);
    if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
      return res.status(401).json({ success: false, message: "Invalid refresh token" });
    }
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.logout = async (req, res) => {
  const { refresh_token } = req.body;

  if (!refresh_token) {
    return res.status(400).json({ success: false, message: "Refresh token required" });
  }

  try {
    // Revoke the refresh token
    await db.execute(
      `UPDATE tokens SET is_revoked = TRUE WHERE refresh_token = ?`,
      [refresh_token]
    );

    res.json({ success: true, message: "Logged out successfully" });
  } catch (err) {
    console.error("Error in logout:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.checkEmail = async (req, res) => {
  const { user_email } = req.body;

  try {
    const query = `SELECT * FROM users WHERE user_email = ?`;
    const [results] = await db.execute(query, [user_email]);

    if (results.length > 0) {
      res.json({ available: false, message: "Email is already taken" });
    } else {
      res.json({ available: true, message: "Email is available" });
    }
  } catch (err) {
    console.error("Error checking email:", err);
    res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
