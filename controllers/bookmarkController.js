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

// Cardiovascular System

// Add a cardiovascular-system bookmark
exports.addCardiovascularSystemBookmark = (req, res) => {
  const { term_id } = req.body;
  const user_mail = req.user_mail;

  if (!term_id || !user_mail) {
    return res
      .status(400)
      .json({ success: false, message: "Missing required fields" });
  }

  const query = `INSERT INTO cardiovascular_system_bookmarks (bookmark_by, term_id) VALUES (?, ?)`;
  db.query(query, [user_mail, term_id], (err) => {
    if (err) {
      if (err.code === "ER_DUP_ENTRY") {
        return res
          .status(409)
          .json({ success: false, message: "Bookmark already exists" });
      }
      console.error("Error adding cardiovascular-system bookmark:", err);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
    res.json({
      success: true,
      message: "Cardiovascular-system bookmark added successfully",
    });
  });
};

// Remove a cardiovascular-system bookmark
exports.removeCardiovascularSystemBookmark = (req, res) => {
  const { term_id } = req.body;
  const user_mail = req.user_mail;

  if (!term_id || !user_mail) {
    return res
      .status(400)
      .json({ success: false, message: "Missing required fields" });
  }

  const query = `DELETE FROM cardiovascular_system_bookmarks WHERE bookmark_by = ? AND term_id = ?`;
  db.query(query, [user_mail, term_id], (err) => {
    if (err) {
      console.error("Error removing cardiovascular-system bookmark:", err);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
    res.json({
      success: true,
      message: "Cardiovascular-system bookmark removed successfully",
    });
  });
};

// Display all cardiovascular-system bookmarks for the current user
exports.getCardiovascularSystemBookmarks = (req, res) => {
  const user_mail = req.user_mail;

  if (!user_mail) {
    return res
      .status(400)
      .json({ success: false, message: "User not authenticated" });
  }

  const query = `
    SELECT c.term, c.id
    FROM cardiovascular_system_bookmarks b
    JOIN cardiovascular_system c ON b.term_id = c.id
    WHERE b.bookmark_by = ?
    ORDER BY c.term 
  `;
  db.query(query, [user_mail], (err, results) => {
    if (err) {
      console.error("Error fetching cardiovascular-system bookmarks:", err);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
    res.json({ success: true, bookmarks: results });
  });
};

// Check if a cardiovascular-system term is bookmarked by the current user
exports.isCardiovascularSystemBookmarked = (req, res) => {
  const term_id = req.params.term_id;
  const user_mail = req.user_mail;

  if (!term_id || !user_mail) {
    return res
      .status(400)
      .json({ success: false, message: "Missing required fields" });
  }

  const query = `
    SELECT COUNT(*) AS isBookmarked
    FROM cardiovascular_system_bookmarks
    WHERE bookmark_by = ? AND term_id = ?
  `;
  db.query(query, [user_mail, term_id], (err, results) => {
    if (err) {
      console.error(
        "Error checking cardiovascular-system bookmark state:",
        err
      );
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }

    const isBookmarked = results[0].isBookmarked > 0;
    res.json({
      success: true,
      isBookmarked: isBookmarked,
      message: isBookmarked
        ? "Cardiovascular-system term is bookmarked"
        : "Cardiovascular-system term is not bookmarked",
    });
  });
};

// Integumentary System

// Add an integumentary-system bookmark
exports.addIntegumentarySystemBookmark = (req, res) => {
  const { term_id } = req.body;
  const user_mail = req.user_mail;

  if (!term_id || !user_mail) {
    return res
      .status(400)
      .json({ success: false, message: "Missing required fields" });
  }

  const query = `INSERT INTO integumentary_system_bookmarks (bookmark_by, term_id) VALUES (?, ?)`;
  db.query(query, [user_mail, term_id], (err) => {
    if (err) {
      if (err.code === "ER_DUP_ENTRY") {
        return res
          .status(409)
          .json({ success: false, message: "Bookmark already exists" });
      }
      console.error("Error adding integumentary-system bookmark:", err);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
    res.json({
      success: true,
      message: "Integumentary-system bookmark added successfully",
    });
  });
};

// Remove an integumentary-system bookmark
exports.removeIntegumentarySystemBookmark = (req, res) => {
  const { term_id } = req.body;
  const user_mail = req.user_mail;

  if (!term_id || !user_mail) {
    return res
      .status(400)
      .json({ success: false, message: "Missing required fields" });
  }

  const query = `DELETE FROM integumentary_system_bookmarks WHERE bookmark_by = ? AND term_id = ?`;
  db.query(query, [user_mail, term_id], (err) => {
    if (err) {
      console.error("Error removing integumentary-system bookmark:", err);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
    res.json({
      success: true,
      message: "Integumentary-system bookmark removed successfully",
    });
  });
};

// Display all integumentary-system bookmarks for the current user
exports.getIntegumentarySystemBookmarks = (req, res) => {
  const user_mail = req.user_mail;

  if (!user_mail) {
    return res
      .status(400)
      .json({ success: false, message: "User not authenticated" });
  }

  const query = `
    SELECT c.term, c.id
    FROM integumentary_system_bookmarks b
    JOIN integumentary_system c ON b.term_id = c.id
    WHERE b.bookmark_by = ?
    ORDER BY c.term 
  `;
  db.query(query, [user_mail], (err, results) => {
    if (err) {
      console.error("Error fetching integumentary-system bookmarks:", err);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
    res.json({ success: true, bookmarks: results });
  });
};

// Check if an integumentary-system term is bookmarked by the current user
exports.isIntegumentarySystemBookmarked = (req, res) => {
  const term_id = req.params.term_id;
  const user_mail = req.user_mail;

  if (!term_id || !user_mail) {
    return res
      .status(400)
      .json({ success: false, message: "Missing required fields" });
  }

  const query = `
    SELECT COUNT(*) AS isBookmarked
    FROM integumentary_system_bookmarks
    WHERE bookmark_by = ? AND term_id = ?
  `;
  db.query(query, [user_mail, term_id], (err, results) => {
    if (err) {
      console.error("Error checking integumentary-system bookmark state:", err);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }

    const isBookmarked = results[0].isBookmarked > 0;
    res.json({
      success: true,
      isBookmarked: isBookmarked,
      message: isBookmarked
        ? "Integumentary-system term is bookmarked"
        : "Integumentary-system term is not bookmarked",
    });
  });
};

// Nervous System

// Add a nervous-system bookmark
exports.addNervousSystemBookmark = (req, res) => {
  const { term_id } = req.body;
  const user_mail = req.user_mail;

  if (!term_id || !user_mail) {
    return res
      .status(400)
      .json({ success: false, message: "Missing required fields" });
  }

  const query = `INSERT INTO nervous_system_bookmarks (bookmark_by, term_id) VALUES (?, ?)`;
  db.query(query, [user_mail, term_id], (err) => {
    if (err) {
      if (err.code === "ER_DUP_ENTRY") {
        return res
          .status(409)
          .json({ success: false, message: "Bookmark already exists" });
      }
      console.error("Error adding nervous-system bookmark:", err);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
    res.json({
      success: true,
      message: "Nervous-system bookmark added successfully",
    });
  });
};

// Remove a nervous-system bookmark
exports.removeNervousSystemBookmark = (req, res) => {
  const { term_id } = req.body;
  const user_mail = req.user_mail;

  if (!term_id || !user_mail) {
    return res
      .status(400)
      .json({ success: false, message: "Missing required fields" });
  }

  const query = `DELETE FROM nervous_system_bookmarks WHERE bookmark_by = ? AND term_id = ?`;
  db.query(query, [user_mail, term_id], (err) => {
    if (err) {
      console.error("Error removing nervous-system bookmark:", err);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
    res.json({
      success: true,
      message: "Nervous-system bookmark removed successfully",
    });
  });
};

// Display all nervous-system bookmarks for the current user
exports.getNervousSystemBookmarks = (req, res) => {
  const user_mail = req.user_mail;

  if (!user_mail) {
    return res
      .status(400)
      .json({ success: false, message: "User not authenticated" });
  }

  const query = `
    SELECT c.term, c.id
    FROM nervous_system_bookmarks b
    JOIN nervous_system c ON b.term_id = c.id
    WHERE b.bookmark_by = ?
    ORDER BY c.term 
  `;
  db.query(query, [user_mail], (err, results) => {
    if (err) {
      console.error("Error fetching nervous-system bookmarks:", err);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
    res.json({ success: true, bookmarks: results });
  });
};

// Check if a nervous-system term is bookmarked by the current user
exports.isNervousSystemBookmarked = (req, res) => {
  const term_id = req.params.term_id;
  const user_mail = req.user_mail;

  if (!term_id || !user_mail) {
    return res
      .status(400)
      .json({ success: false, message: "Missing required fields" });
  }

  const query = `
    SELECT COUNT(*) AS isBookmarked
    FROM nervous_system_bookmarks
    WHERE bookmark_by = ? AND term_id = ?
  `;
  db.query(query, [user_mail, term_id], (err, results) => {
    if (err) {
      console.error("Error checking nervous-system bookmark state:", err);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }

    const isBookmarked = results[0].isBookmarked > 0;
    res.json({
      success: true,
      isBookmarked: isBookmarked,
      message: isBookmarked
        ? "Nervous-system term is bookmarked"
        : "Nervous-system term is not bookmarked",
    });
  });
};

// Reproductive System

// Add a reproductive-system bookmark
exports.addReproductiveSystemBookmark = (req, res) => {
  const { term_id } = req.body;
  const user_mail = req.user_mail;

  if (!term_id || !user_mail) {
    return res
      .status(400)
      .json({ success: false, message: "Missing required fields" });
  }

  const query = `INSERT INTO reproductive_system_bookmarks (bookmark_by, term_id) VALUES (?, ?)`;
  db.query(query, [user_mail, term_id], (err) => {
    if (err) {
      if (err.code === "ER_DUP_ENTRY") {
        return res
          .status(409)
          .json({ success: false, message: "Bookmark already exists" });
      }
      console.error("Error adding reproductive-system bookmark:", err);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
    res.json({
      success: true,
      message: "Reproductive-system bookmark added successfully",
    });
  });
};

// Remove a reproductive-system bookmark
exports.removeReproductiveSystemBookmark = (req, res) => {
  const { term_id } = req.body;
  const user_mail = req.user_mail;

  if (!term_id || !user_mail) {
    return res
      .status(400)
      .json({ success: false, message: "Missing required fields" });
  }

  const query = `DELETE FROM reproductive_system_bookmarks WHERE bookmark_by = ? AND term_id = ?`;
  db.query(query, [user_mail, term_id], (err) => {
    if (err) {
      console.error("Error removing reproductive-system bookmark:", err);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
    res.json({
      success: true,
      message: "Reproductive-system bookmark removed successfully",
    });
  });
};

// Display all reproductive-system bookmarks for the current user
exports.getReproductiveSystemBookmarks = (req, res) => {
  const user_mail = req.user_mail;

  if (!user_mail) {
    return res
      .status(400)
      .json({ success: false, message: "User not authenticated" });
  }

  const query = `
    SELECT c.term, c.id
    FROM reproductive_system_bookmarks b
    JOIN reproductive_system c ON b.term_id = c.id
    WHERE b.bookmark_by = ?
    ORDER BY c.term 
  `;
  db.query(query, [user_mail], (err, results) => {
    if (err) {
      console.error("Error fetching reproductive-system bookmarks:", err);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
    res.json({ success: true, bookmarks: results });
  });
};

// Check if a reproductive-system term is bookmarked by the current user
exports.isReproductiveSystemBookmarked = (req, res) => {
  const term_id = req.params.term_id;
  const user_mail = req.user_mail;

  if (!term_id || !user_mail) {
    return res
      .status(400)
      .json({ success: false, message: "Missing required fields" });
  }

  const query = `
    SELECT COUNT(*) AS isBookmarked
    FROM reproductive_system_bookmarks
    WHERE bookmark_by = ? AND term_id = ?
  `;
  db.query(query, [user_mail, term_id], (err, results) => {
    if (err) {
      console.error("Error checking reproductive-system bookmark state:", err);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }

    const isBookmarked = results[0].isBookmarked > 0;
    res.json({
      success: true,
      isBookmarked: isBookmarked,
      message: isBookmarked
        ? "Reproductive-system term is bookmarked"
        : "Reproductive-system term is not bookmarked",
    });
  });
};

// Respiratory System

// Add a respiratory-system bookmark
exports.addRespiratorySystemBookmark = (req, res) => {
  const { term_id } = req.body;
  const user_mail = req.user_mail;

  if (!term_id || !user_mail) {
    return res
      .status(400)
      .json({ success: false, message: "Missing required fields" });
  }

  const query = `INSERT INTO respiratory_system_bookmarks (bookmark_by, term_id) VALUES (?, ?)`;
  db.query(query, [user_mail, term_id], (err) => {
    if (err) {
      if (err.code === "ER_DUP_ENTRY") {
        return res
          .status(409)
          .json({ success: false, message: "Bookmark already exists" });
      }
      console.error("Error adding respiratory-system bookmark:", err);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
    res.json({
      success: true,
      message: "Respiratory-system bookmark added successfully",
    });
  });
};

// Remove a respiratory-system bookmark
exports.removeRespiratorySystemBookmark = (req, res) => {
  const { term_id } = req.body;
  const user_mail = req.user_mail;

  if (!term_id || !user_mail) {
    return res
      .status(400)
      .json({ success: false, message: "Missing required fields" });
  }

  const query = `DELETE FROM respiratory_system_bookmarks WHERE bookmark_by = ? AND term_id = ?`;
  db.query(query, [user_mail, term_id], (err) => {
    if (err) {
      console.error("Error removing respiratory-system bookmark:", err);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
    res.json({
      success: true,
      message: "Respiratory-system bookmark removed successfully",
    });
  });
};

// Display all respiratory-system bookmarks for the current user
exports.getRespiratorySystemBookmarks = (req, res) => {
  const user_mail = req.user_mail;

  if (!user_mail) {
    return res
      .status(400)
      .json({ success: false, message: "User not authenticated" });
  }

  const query = `
    SELECT c.term, c.id
    FROM respiratory_system_bookmarks b
    JOIN respiratory_system c ON b.term_id = c.id
    WHERE b.bookmark_by = ?
    ORDER BY c.term 
  `;
  db.query(query, [user_mail], (err, results) => {
    if (err) {
      console.error("Error fetching respiratory-system bookmarks:", err);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
    res.json({ success: true, bookmarks: results });
  });
};

// Check if a respiratory-system term is bookmarked by the current user
exports.isRespiratorySystemBookmarked = (req, res) => {
  const term_id = req.params.term_id;
  const user_mail = req.user_mail;

  if (!term_id || !user_mail) {
    return res
      .status(400)
      .json({ success: false, message: "Missing required fields" });
  }

  const query = `
    SELECT COUNT(*) AS isBookmarked
    FROM respiratory_system_bookmarks
    WHERE bookmark_by = ? AND term_id = ?
  `;
  db.query(query, [user_mail, term_id], (err, results) => {
    if (err) {
      console.error("Error checking respiratory-system bookmark state:", err);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }

    const isBookmarked = results[0].isBookmarked > 0;
    res.json({
      success: true,
      isBookmarked: isBookmarked,
      message: isBookmarked
        ? "Respiratory-system term is bookmarked"
        : "Respiratory-system term is not bookmarked",
    });
  });
};

// Urinary System

// Add a urinary-system bookmark
exports.addUrinarySystemBookmark = (req, res) => {
  const { term_id } = req.body;
  const user_mail = req.user_mail;

  if (!term_id || !user_mail) {
    return res
      .status(400)
      .json({ success: false, message: "Missing required fields" });
  }

  const query = `INSERT INTO urinary_system_bookmarks (bookmark_by, term_id) VALUES (?, ?)`;
  db.query(query, [user_mail, term_id], (err) => {
    if (err) {
      if (err.code === "ER_DUP_ENTRY") {
        return res
          .status(409)
          .json({ success: false, message: "Bookmark already exists" });
      }
      console.error("Error adding urinary-system bookmark:", err);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
    res.json({
      success: true,
      message: "Urinary-system bookmark added successfully",
    });
  });
};

// Remove a urinary-system bookmark
exports.removeUrinarySystemBookmark = (req, res) => {
  const { term_id } = req.body;
  const user_mail = req.user_mail;

  if (!term_id || !user_mail) {
    return res
      .status(400)
      .json({ success: false, message: "Missing required fields" });
  }

  const query = `DELETE FROM urinary_system_bookmarks WHERE bookmark_by = ? AND term_id = ?`;
  db.query(query, [user_mail, term_id], (err) => {
    if (err) {
      console.error("Error removing urinary-system bookmark:", err);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
    res.json({
      success: true,
      message: "Urinary-system bookmark removed successfully",
    });
  });
};

// Display all urinary-system bookmarks for the current user
exports.getUrinarySystemBookmarks = (req, res) => {
  const user_mail = req.user_mail;

  if (!user_mail) {
    return res
      .status(400)
      .json({ success: false, message: "User not authenticated" });
  }

  const query = `
    SELECT c.term, c.id
    FROM urinary_system_bookmarks b
    JOIN urinary_system c ON b.term_id = c.id
    WHERE b.bookmark_by = ?
    ORDER BY c.term 
  `;
  db.query(query, [user_mail], (err, results) => {
    if (err) {
      console.error("Error fetching urinary-system bookmarks:", err);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
    res.json({ success: true, bookmarks: results });
  });
};

// Check if a urinary-system term is bookmarked by the current user
exports.isUrinarySystemBookmarked = (req, res) => {
  const term_id = req.params.term_id;
  const user_mail = req.user_mail;

  if (!term_id || !user_mail) {
    return res
      .status(400)
      .json({ success: false, message: "Missing required fields" });
  }

  const query = `
    SELECT COUNT(*) AS isBookmarked
    FROM urinary_system_bookmarks
    WHERE bookmark_by = ? AND term_id = ?
  `;
  db.query(query, [user_mail, term_id], (err, results) => {
    if (err) {
      console.error("Error checking urinary-system bookmark state:", err);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }

    const isBookmarked = results[0].isBookmarked > 0;
    res.json({
      success: true,
      isBookmarked: isBookmarked,
      message: isBookmarked
        ? "Urinary-system term is bookmarked"
        : "Urinary-system term is not bookmarked",
    });
  });
};

// Muscular System English

// Add a MuscleEnglish bookmark
exports.addUMuscleEnglishBookmark = (req, res) => {
  const { term_id } = req.body;
  const user_mail = req.user_mail;

  if (!term_id || !user_mail) {
    return res
      .status(400)
      .json({ success: false, message: "Missing required fields" });
  }

  const query = `INSERT INTO muscle_english_bookmarks (bookmark_by, term_id) VALUES (?, ?)`;
  db.query(query, [user_mail, term_id], (err) => {
    if (err) {
      if (err.code === "ER_DUP_ENTRY") {
        return res
          .status(409)
          .json({ success: false, message: "Bookmark already exists" });
      }
      console.error("Error adding Muscle English bookmark:", err);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
    res.json({
      success: true,
      message: "Muscle English bookmark added successfully",
    });
  });
};

// Remove a Muscle English bookmark
exports.removeMuscleEnglishBookmark = (req, res) => {
  const { term_id } = req.body;
  const user_mail = req.user_mail;

  if (!term_id || !user_mail) {
    return res
      .status(400)
      .json({ success: false, message: "Missing required fields" });
  }

  const query = `DELETE FROM muscle_english_bookmarks WHERE bookmark_by = ? AND term_id = ?`;
  db.query(query, [user_mail, term_id], (err) => {
    if (err) {
      console.error("Error removing Muscle English bookmark:", err);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
    res.json({
      success: true,
      message: "Muscle English bookmark removed successfully",
    });
  });
};

// Display all Muscle English bookmarks for the current user
exports.getMuscleEnglishBookmarks = (req, res) => {
  const user_mail = req.user_mail;

  if (!user_mail) {
    return res
      .status(400)
      .json({ success: false, message: "User not authenticated" });
  }

  const query = `
    SELECT c.term, c.id
    FROM muscle_english_bookmarks b
    JOIN muscle_english c ON b.term_id = c.id
    WHERE b.bookmark_by = ?
    ORDER BY c.term 
  `;
  db.query(query, [user_mail], (err, results) => {
    if (err) {
      console.error("Error fetching Muscle English bookmarks:", err);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
    res.json({ success: true, bookmarks: results });
  });
};

// Check if a Muscle English term is bookmarked by the current user
exports.isMuscleEnglishBookmarked = (req, res) => {
  const term_id = req.params.term_id;
  const user_mail = req.user_mail;

  if (!term_id || !user_mail) {
    return res
      .status(400)
      .json({ success: false, message: "Missing required fields" });
  }

  const query = `
    SELECT COUNT(*) AS isBookmarked
    FROM muscle_english_bookmarks
    WHERE bookmark_by = ? AND term_id = ?
  `;
  db.query(query, [user_mail, term_id], (err, results) => {
    if (err) {
      console.error("Error checking Muscle English bookmark state:", err);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }

    const isBookmarked = results[0].isBookmarked > 0;
    res.json({
      success: true,
      isBookmarked: isBookmarked,
      message: isBookmarked
        ? "Muscle English term is bookmarked"
        : "Muscle English term is not bookmarked",
    });
  });
};
