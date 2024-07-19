const db = require("../config/db");

exports.updateProfile = (req, res) => {
  const { name, email } = req.body;
  const currentUserMail = req.user_mail;

  const query = `UPDATE user SET user_name = ?, user_mail = ? WHERE user_mail = ?`;
  db.query(query, [name, email, currentUserMail], (err, results) => {
    if (err) {
      console.error("Error updating profile:", err);
      return res
        .status(500)
        .json({ success: false, message: "Failed to update profile" });
    }

    if (results.changedRows === 1) {
      res.json({ success: true, message: "Profile updated successfully" });
    } else {
      if (results.affectedRows === 0) {
        res.status(404).json({ success: false, message: "User not found" });
      } else {
        res.status(400).json({
          success: false,
          message: "No changes made or multiple users updated",
        });
      }
    }
  });
};

exports.getSecuredInfo = (req, res) => {
  const query = `SELECT user_name FROM user WHERE user_mail = ?`;
  db.query(query, [req.user_mail], (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ success: false, message: "Error retrieving user information" });
    }
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
  });
};
