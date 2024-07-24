const db = require("../config/db");

// Add a sample-term bookmark
exports.addSampleTermBookmark = (req, res) => {
  const { term_id } = req.body;
  const user_mail = req.user_mail;

  if (!term_id || !user_mail) {
    return res
      .status(400)
      .json({ success: false, message: "Missing required fields" });
  }

  const query = `INSERT INTO sample_term_bookmarks (bookmark_by, term_id) VALUES (?, ?)`;
  db.query(query, [user_mail, term_id], (err) => {
    if (err) {
      if (err.code === "ER_DUP_ENTRY") {
        return res
          .status(409)
          .json({ success: false, message: "Bookmark already exists" });
      }
      console.error("Error adding sample-term bookmark:", err);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
    res.json({
      success: true,
      message: "Sample-term bookmark added successfully",
    });
  });
};

// Remove a sample-term bookmark
exports.removeSampleTermBookmark = (req, res) => {
  const { term_id } = req.body;
  const user_mail = req.user_mail;

  if (!term_id || !user_mail) {
    return res
      .status(400)
      .json({ success: false, message: "Missing required fields" });
  }

  const query = `DELETE FROM sample_term_bookmarks WHERE bookmark_by = ? AND term_id = ?`;
  db.query(query, [user_mail, term_id], (err) => {
    if (err) {
      console.error("Error removing sample-term bookmark:", err);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
    res.json({
      success: true,
      message: "Sample-term bookmark removed successfully",
    });
  });
};

// Display all sample-term bookmarks for the current user
exports.getSampleTermBookmarks = (req, res) => {
  const user_mail = req.user_mail;

  if (!user_mail) {
    return res
      .status(400)
      .json({ success: false, message: "User not authenticated" });
  }

  const query = `
    SELECT c.term, c.id
    FROM sample_term_bookmarks b
    JOIN sample_term c ON b.term_id = c.id
    WHERE b.bookmark_by = ?
    ORDER BY c.term 
  `;
  db.query(query, [user_mail], (err, results) => {
    if (err) {
      console.error("Error fetching sample-term bookmarks:", err);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
    res.json({ success: true, bookmarks: results });
  });
};

// Check if a sample-term is bookmarked by the current user
exports.isSampleTermBookmarked = (req, res) => {
  const term_id = req.params.term_id;
  const user_mail = req.user_mail;

  if (!term_id || !user_mail) {
    return res
      .status(400)
      .json({ success: false, message: "Missing required fields" });
  }

  const query = `
    SELECT COUNT(*) AS isBookmarked
    FROM sample_term_bookmarks
    WHERE bookmark_by = ? AND term_id = ?
  `;
  db.query(query, [user_mail, term_id], (err, results) => {
    if (err) {
      console.error("Error checking sample-term bookmark state:", err);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }

    const isBookmarked = results[0].isBookmarked > 0;
    res.json({
      success: true,
      isBookmarked: isBookmarked,
      message: isBookmarked
        ? "Sample-term is bookmarked"
        : "Sample-term is not bookmarked",
    });
  });
};

// Add a skeletal-system bookmark
exports.addSkeletalSystemBookmark = (req, res) => {
  const { term_id } = req.body;
  const user_mail = req.user_mail;

  if (!term_id || !user_mail) {
    return res
      .status(400)
      .json({ success: false, message: "Missing required fields" });
  }

  const query = `INSERT INTO skeletal_system_bookmarks (bookmark_by, term_id) VALUES (?, ?)`;
  db.query(query, [user_mail, term_id], (err) => {
    if (err) {
      if (err.code === "ER_DUP_ENTRY") {
        return res
          .status(409)
          .json({ success: false, message: "Bookmark already exists" });
      }
      console.error("Error adding skeletal-system bookmark:", err);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
    res.json({
      success: true,
      message: "Skeletal-system bookmark added successfully",
    });
  });
};

// Remove a skeletal-system bookmark
exports.removeSkeletalSystemBookmark = (req, res) => {
  const { term_id } = req.body;
  const user_mail = req.user_mail;

  if (!term_id || !user_mail) {
    return res
      .status(400)
      .json({ success: false, message: "Missing required fields" });
  }

  const query = `DELETE FROM skeletal_system_bookmarks WHERE bookmark_by = ? AND term_id = ?`;
  db.query(query, [user_mail, term_id], (err) => {
    if (err) {
      console.error("Error removing skeletal-system bookmark:", err);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
    res.json({
      success: true,
      message: "Skeletal-system bookmark removed successfully",
    });
  });
};

// Display all skeletal-system bookmarks for the current user
exports.getSkeletalSystemBookmarks = (req, res) => {
  const user_mail = req.user_mail;

  if (!user_mail) {
    return res
      .status(400)
      .json({ success: false, message: "User not authenticated" });
  }

  const query = `
    SELECT c.term, c.id
    FROM skeletal_system_bookmarks b
    JOIN skeletal_system c ON b.term_id = c.id
    WHERE b.bookmark_by = ?
    ORDER BY c.term 
  `;
  db.query(query, [user_mail], (err, results) => {
    if (err) {
      console.error("Error fetching skeletal-system bookmarks:", err);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
    res.json({ success: true, bookmarks: results });
  });
};

// Check if a skeletal-system term is bookmarked by the current user
exports.isSkeletalSystemBookmarked = (req, res) => {
  const term_id = req.params.term_id;
  const user_mail = req.user_mail;

  if (!term_id || !user_mail) {
    return res
      .status(400)
      .json({ success: false, message: "Missing required fields" });
  }

  const query = `
    SELECT COUNT(*) AS isBookmarked
    FROM skeletal_system_bookmarks
    WHERE bookmark_by = ? AND term_id = ?
  `;
  db.query(query, [user_mail, term_id], (err, results) => {
    if (err) {
      console.error("Error checking skeletal-system bookmark state:", err);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }

    const isBookmarked = results[0].isBookmarked > 0;
    res.json({
      success: true,
      isBookmarked: isBookmarked,
      message: isBookmarked
        ? "Skeletal-system term is bookmarked"
        : "Skeletal-system term is not bookmarked",
    });
  });
};
