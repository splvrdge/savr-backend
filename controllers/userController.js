const db = require("../config/db");

// Update user profile
exports.updateProfile = async (req, res) => {
  const { name, email } = req.body;
  const currentUserMail = req.user_email;

  if (!name || !email) {
    return res
      .status(400)
      .json({ success: false, message: "Missing required fields" });
  }

  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();

    // First check if email already exists (if changing email)
    if (email !== currentUserMail) {
      const [existingUsers] = await connection.execute(
        'SELECT user_id FROM users WHERE user_email = ? AND user_email != ?',
        [email, currentUserMail]
      );
      
      if (existingUsers.length > 0) {
        await connection.rollback();
        return res.status(400).json({
          success: false,
          message: "Email already in use"
        });
      }
    }

    // Update user profile
    const [results] = await connection.execute(
      `UPDATE users SET user_name = ?, user_email = ? WHERE user_email = ?`,
      [name, email, currentUserMail]
    );

    if (results.affectedRows === 0) {
      await connection.rollback();
      return res.status(404).json({ 
        success: false, 
        message: "User not found" 
      });
    }

    // If email was changed, revoke all tokens
    if (email !== currentUserMail) {
      await connection.execute(
        `UPDATE tokens SET is_revoked = TRUE WHERE user_id = (SELECT user_id FROM users WHERE user_email = ?)`,
        [email]
      );
    }

    await connection.commit();
    
    res.json({ 
      success: true, 
      message: "Profile updated successfully",
      requireRelogin: email !== currentUserMail
    });

  } catch (err) {
    await connection.rollback();
    console.error("Error updating profile:", err);
    res.status(500).json({ 
      success: false, 
      message: "Failed to update profile" 
    });
  } finally {
    connection.release();
  }
};

// Get secured user information
exports.getSecuredInfo = async (req, res) => {
  const query = `SELECT user_name FROM users WHERE user_email = ?`;
  try {
    const [results] = await db.execute(query, [req.user_email]);

    if (results.length === 1) {
      const user = results[0];
      res.json({
        success: true,
        message: "User authenticated",
        user_name: user.user_name,
      });
    } else {
      res.status(404).json({ success: false, message: "User not found" });
    }
  } catch (err) {
    console.error("Error retrieving user information:", err);
    res
      .status(500)
      .json({ success: false, message: "Error retrieving user information" });
  }
};
