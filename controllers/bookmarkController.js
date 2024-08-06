const db = require("../config/db");

// Add a sample-term bookmark
exports.addSampleTermBookmark = async (req, res) => {
  const { term_id } = req.body;
  const user_mail = req.user_mail;

  if (!term_id || !user_mail) {
    return res
      .status(400)
      .json({ success: false, message: "Missing required fields" });
  }

  const query = `INSERT INTO sample_term_bookmarks (bookmark_by, term_id) VALUES (?, ?)`;
  try {
    await db.execute(query, [user_mail, term_id]);
    res.json({
      success: true,
      message: "Sample-term bookmark added successfully",
    });
  } catch (err) {
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
};

// Remove a sample-term bookmark
exports.removeSampleTermBookmark = async (req, res) => {
  const { term_id } = req.body;
  const user_mail = req.user_mail;

  if (!term_id || !user_mail) {
    return res
      .status(400)
      .json({ success: false, message: "Missing required fields" });
  }

  const query = `DELETE FROM sample_term_bookmarks WHERE bookmark_by = ? AND term_id = ?`;
  try {
    await db.execute(query, [user_mail, term_id]);
    res.json({
      success: true,
      message: "Sample-term bookmark removed successfully",
    });
  } catch (err) {
    console.error("Error removing sample-term bookmark:", err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

// Display all sample-term bookmarks for the current user
exports.getSampleTermBookmarks = async (req, res) => {
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
  try {
    const [results] = await db.execute(query, [user_mail]);
    res.json({ success: true, bookmarks: results });
  } catch (err) {
    console.error("Error fetching sample-term bookmarks:", err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

// Check if a sample-term is bookmarked by the current user
exports.isSampleTermBookmarked = async (req, res) => {
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
  try {
    const [results] = await db.execute(query, [user_mail, term_id]);
    const isBookmarked = results[0].isBookmarked > 0;
    res.json({
      success: true,
      isBookmarked: isBookmarked,
      message: isBookmarked
        ? "Sample-term is bookmarked"
        : "Sample-term is not bookmarked",
    });
  } catch (err) {
    console.error("Error checking sample-term bookmark state:", err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
// Add a skeletal-system bookmark
exports.addSkeletalSystemBookmark = async (req, res) => {
  const { term_id } = req.body;
  const user_mail = req.user_mail;

  if (!term_id || !user_mail) {
    return res
      .status(400)
      .json({ success: false, message: "Missing required fields" });
  }

  const query = `INSERT INTO skeletal_system_bookmarks (bookmark_by, term_id) VALUES (?, ?)`;
  try {
    await db.execute(query, [user_mail, term_id]);
    res.json({
      success: true,
      message: "Skeletal-system bookmark added successfully",
    });
  } catch (err) {
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
};

// Remove a skeletal-system bookmark
exports.removeSkeletalSystemBookmark = async (req, res) => {
  const { term_id } = req.body;
  const user_mail = req.user_mail;

  if (!term_id || !user_mail) {
    return res
      .status(400)
      .json({ success: false, message: "Missing required fields" });
  }

  const query = `DELETE FROM skeletal_system_bookmarks WHERE bookmark_by = ? AND term_id = ?`;
  try {
    await db.execute(query, [user_mail, term_id]);
    res.json({
      success: true,
      message: "Skeletal-system bookmark removed successfully",
    });
  } catch (err) {
    console.error("Error removing skeletal-system bookmark:", err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

// Display all skeletal-system bookmarks for the current user
exports.getSkeletalSystemBookmarks = async (req, res) => {
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
  try {
    const [results] = await db.execute(query, [user_mail]);
    res.json({ success: true, bookmarks: results });
  } catch (err) {
    console.error("Error fetching skeletal-system bookmarks:", err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

// Check if a skeletal-system term is bookmarked by the current user
exports.isSkeletalSystemBookmarked = async (req, res) => {
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
  try {
    const [results] = await db.execute(query, [user_mail, term_id]);
    const isBookmarked = results[0].isBookmarked > 0;
    res.json({
      success: true,
      isBookmarked: isBookmarked,
      message: isBookmarked
        ? "Skeletal-system term is bookmarked"
        : "Skeletal-system term is not bookmarked",
    });
  } catch (err) {
    console.error("Error checking skeletal-system bookmark state:", err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
// Add a cardiovascular-system bookmark
exports.addCardiovascularSystemBookmark = async (req, res) => {
  const { term_id } = req.body;
  const user_mail = req.user_mail;

  if (!term_id || !user_mail) {
    return res
      .status(400)
      .json({ success: false, message: "Missing required fields" });
  }

  const query = `INSERT INTO cardiovascular_system_bookmarks (bookmark_by, term_id) VALUES (?, ?)`;
  try {
    await db.execute(query, [user_mail, term_id]);
    res.json({
      success: true,
      message: "Cardiovascular-system bookmark added successfully",
    });
  } catch (err) {
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
};

// Remove a cardiovascular-system bookmark
exports.removeCardiovascularSystemBookmark = async (req, res) => {
  const { term_id } = req.body;
  const user_mail = req.user_mail;

  if (!term_id || !user_mail) {
    return res
      .status(400)
      .json({ success: false, message: "Missing required fields" });
  }

  const query = `DELETE FROM cardiovascular_system_bookmarks WHERE bookmark_by = ? AND term_id = ?`;
  try {
    await db.execute(query, [user_mail, term_id]);
    res.json({
      success: true,
      message: "Cardiovascular-system bookmark removed successfully",
    });
  } catch (err) {
    console.error("Error removing cardiovascular-system bookmark:", err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

// Display all cardiovascular-system bookmarks for the current user
exports.getCardiovascularSystemBookmarks = async (req, res) => {
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
  try {
    const [results] = await db.execute(query, [user_mail]);
    res.json({ success: true, bookmarks: results });
  } catch (err) {
    console.error("Error fetching cardiovascular-system bookmarks:", err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

// Check if a cardiovascular-system term is bookmarked by the current user
exports.isCardiovascularSystemBookmarked = async (req, res) => {
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
  try {
    const [results] = await db.execute(query, [user_mail, term_id]);
    const isBookmarked = results[0].isBookmarked > 0;
    res.json({
      success: true,
      isBookmarked: isBookmarked,
      message: isBookmarked
        ? "Cardiovascular-system term is bookmarked"
        : "Cardiovascular-system term is not bookmarked",
    });
  } catch (err) {
    console.error("Error checking cardiovascular-system bookmark state:", err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

// Add an integumentary-system bookmark
exports.addIntegumentarySystemBookmark = async (req, res) => {
  const { term_id } = req.body;
  const user_mail = req.user_mail;

  if (!term_id || !user_mail) {
    return res
      .status(400)
      .json({ success: false, message: "Missing required fields" });
  }

  const query = `INSERT INTO integumentary_system_bookmarks (bookmark_by, term_id) VALUES (?, ?)`;
  try {
    await db.execute(query, [user_mail, term_id]);
    res.json({
      success: true,
      message: "Integumentary-system bookmark added successfully",
    });
  } catch (err) {
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
};

// Remove an integumentary-system bookmark
exports.removeIntegumentarySystemBookmark = async (req, res) => {
  const { term_id } = req.body;
  const user_mail = req.user_mail;

  if (!term_id || !user_mail) {
    return res
      .status(400)
      .json({ success: false, message: "Missing required fields" });
  }

  const query = `DELETE FROM integumentary_system_bookmarks WHERE bookmark_by = ? AND term_id = ?`;
  try {
    await db.execute(query, [user_mail, term_id]);
    res.json({
      success: true,
      message: "Integumentary-system bookmark removed successfully",
    });
  } catch (err) {
    console.error("Error removing integumentary-system bookmark:", err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

// Display all integumentary-system bookmarks for the current user
exports.getIntegumentarySystemBookmarks = async (req, res) => {
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
  try {
    const [results] = await db.execute(query, [user_mail]);
    res.json({ success: true, bookmarks: results });
  } catch (err) {
    console.error("Error fetching integumentary-system bookmarks:", err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

// Check if an integumentary-system term is bookmarked by the current user
exports.isIntegumentarySystemBookmarked = async (req, res) => {
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
  try {
    const [results] = await db.execute(query, [user_mail, term_id]);
    const isBookmarked = results[0].isBookmarked > 0;
    res.json({
      success: true,
      isBookmarked: isBookmarked,
      message: isBookmarked
        ? "Integumentary-system term is bookmarked"
        : "Integumentary-system term is not bookmarked",
    });
  } catch (err) {
    console.error("Error checking integumentary-system bookmark state:", err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
// Add a nervous-system bookmark
exports.addNervousSystemBookmark = async (req, res) => {
  const { term_id } = req.body;
  const user_mail = req.user_mail;

  if (!term_id || !user_mail) {
    return res
      .status(400)
      .json({ success: false, message: "Missing required fields" });
  }

  const query = `INSERT INTO nervous_system_bookmarks (bookmark_by, term_id) VALUES (?, ?)`;
  try {
    await db.execute(query, [user_mail, term_id]);
    res.json({
      success: true,
      message: "Nervous-system bookmark added successfully",
    });
  } catch (err) {
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
};

// Remove a nervous-system bookmark
exports.removeNervousSystemBookmark = async (req, res) => {
  const { term_id } = req.body;
  const user_mail = req.user_mail;

  if (!term_id || !user_mail) {
    return res
      .status(400)
      .json({ success: false, message: "Missing required fields" });
  }

  const query = `DELETE FROM nervous_system_bookmarks WHERE bookmark_by = ? AND term_id = ?`;
  try {
    await db.execute(query, [user_mail, term_id]);
    res.json({
      success: true,
      message: "Nervous-system bookmark removed successfully",
    });
  } catch (err) {
    console.error("Error removing nervous-system bookmark:", err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

// Display all nervous-system bookmarks for the current user
exports.getNervousSystemBookmarks = async (req, res) => {
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
  try {
    const [results] = await db.execute(query, [user_mail]);
    res.json({ success: true, bookmarks: results });
  } catch (err) {
    console.error("Error fetching nervous-system bookmarks:", err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

// Check if a nervous-system term is bookmarked by the current user
exports.isNervousSystemBookmarked = async (req, res) => {
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
  try {
    const [results] = await db.execute(query, [user_mail, term_id]);
    const isBookmarked = results[0].isBookmarked > 0;
    res.json({
      success: true,
      isBookmarked: isBookmarked,
      message: isBookmarked
        ? "Nervous-system term is bookmarked"
        : "Nervous-system term is not bookmarked",
    });
  } catch (err) {
    console.error("Error checking nervous-system bookmark state:", err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
// Add a reproductive-system bookmark
exports.addReproductiveSystemBookmark = async (req, res) => {
  const { term_id } = req.body;
  const user_mail = req.user_mail;

  if (!term_id || !user_mail) {
    return res
      .status(400)
      .json({ success: false, message: "Missing required fields" });
  }

  const query = `INSERT INTO reproductive_system_bookmarks (bookmark_by, term_id) VALUES (?, ?)`;
  try {
    await db.execute(query, [user_mail, term_id]);
    res.json({
      success: true,
      message: "Reproductive-system bookmark added successfully",
    });
  } catch (err) {
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
};

// Remove a reproductive-system bookmark
exports.removeReproductiveSystemBookmark = async (req, res) => {
  const { term_id } = req.body;
  const user_mail = req.user_mail;

  if (!term_id || !user_mail) {
    return res
      .status(400)
      .json({ success: false, message: "Missing required fields" });
  }

  const query = `DELETE FROM reproductive_system_bookmarks WHERE bookmark_by = ? AND term_id = ?`;
  try {
    await db.execute(query, [user_mail, term_id]);
    res.json({
      success: true,
      message: "Reproductive-system bookmark removed successfully",
    });
  } catch (err) {
    console.error("Error removing reproductive-system bookmark:", err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

// Display all reproductive-system bookmarks for the current user
exports.getReproductiveSystemBookmarks = async (req, res) => {
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
  try {
    const [results] = await db.execute(query, [user_mail]);
    res.json({ success: true, bookmarks: results });
  } catch (err) {
    console.error("Error fetching reproductive-system bookmarks:", err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

// Check if a reproductive-system term is bookmarked by the current user
exports.isReproductiveSystemBookmarked = async (req, res) => {
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
  try {
    const [results] = await db.execute(query, [user_mail, term_id]);
    const isBookmarked = results[0].isBookmarked > 0;
    res.json({
      success: true,
      isBookmarked: isBookmarked,
      message: isBookmarked
        ? "Reproductive-system term is bookmarked"
        : "Reproductive-system term is not bookmarked",
    });
  } catch (err) {
    console.error("Error checking reproductive-system bookmark state:", err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

// Respiratory System

// Add a respiratory-system bookmark
exports.addRespiratorySystemBookmark = async (req, res) => {
  const { term_id } = req.body;
  const user_mail = req.user_mail;

  if (!term_id || !user_mail) {
    return res
      .status(400)
      .json({ success: false, message: "Missing required fields" });
  }

  const query = `INSERT INTO respiratory_system_bookmarks (bookmark_by, term_id) VALUES (?, ?)`;
  try {
    await db.execute(query, [user_mail, term_id]);
    res.json({
      success: true,
      message: "Respiratory-system bookmark added successfully",
    });
  } catch (err) {
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
};

// Remove a respiratory-system bookmark
exports.removeRespiratorySystemBookmark = async (req, res) => {
  const { term_id } = req.body;
  const user_mail = req.user_mail;

  if (!term_id || !user_mail) {
    return res
      .status(400)
      .json({ success: false, message: "Missing required fields" });
  }

  const query = `DELETE FROM respiratory_system_bookmarks WHERE bookmark_by = ? AND term_id = ?`;
  try {
    await db.execute(query, [user_mail, term_id]);
    res.json({
      success: true,
      message: "Respiratory-system bookmark removed successfully",
    });
  } catch (err) {
    console.error("Error removing respiratory-system bookmark:", err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

// Display all respiratory-system bookmarks for the current user
exports.getRespiratorySystemBookmarks = async (req, res) => {
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
  try {
    const [results] = await db.execute(query, [user_mail]);
    res.json({ success: true, bookmarks: results });
  } catch (err) {
    console.error("Error fetching respiratory-system bookmarks:", err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

// Check if a respiratory-system term is bookmarked by the current user
exports.isRespiratorySystemBookmarked = async (req, res) => {
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
  try {
    const [results] = await db.execute(query, [user_mail, term_id]);
    const isBookmarked = results[0].isBookmarked > 0;
    res.json({
      success: true,
      isBookmarked: isBookmarked,
      message: isBookmarked
        ? "Respiratory-system term is bookmarked"
        : "Respiratory-system term is not bookmarked",
    });
  } catch (err) {
    console.error("Error checking respiratory-system bookmark state:", err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

// Urinary System

// Add a urinary-system bookmark
exports.addUrinarySystemBookmark = async (req, res) => {
  const { term_id } = req.body;
  const user_mail = req.user_mail;

  if (!term_id || !user_mail) {
    return res
      .status(400)
      .json({ success: false, message: "Missing required fields" });
  }

  const query = `INSERT INTO urinary_system_bookmarks (bookmark_by, term_id) VALUES (?, ?)`;
  try {
    await db.execute(query, [user_mail, term_id]);
    res.json({
      success: true,
      message: "Urinary-system bookmark added successfully",
    });
  } catch (err) {
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
};
// Remove a urinary-system bookmark
exports.removeUrinarySystemBookmark = async (req, res) => {
  const { term_id } = req.body;
  const user_mail = req.user_mail;

  if (!term_id || !user_mail) {
    return res
      .status(400)
      .json({ success: false, message: "Missing required fields" });
  }

  const query = `DELETE FROM urinary_system_bookmarks WHERE bookmark_by = ? AND term_id = ?`;
  try {
    await db.execute(query, [user_mail, term_id]);
    res.json({
      success: true,
      message: "Urinary-system bookmark removed successfully",
    });
  } catch (err) {
    console.error("Error removing urinary-system bookmark:", err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

// Display all urinary-system bookmarks for the current user
exports.getUrinarySystemBookmarks = async (req, res) => {
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
  try {
    const [results] = await db.execute(query, [user_mail]);
    res.json({ success: true, bookmarks: results });
  } catch (err) {
    console.error("Error fetching urinary-system bookmarks:", err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

// Check if a urinary-system term is bookmarked by the current user
exports.isUrinarySystemBookmarked = async (req, res) => {
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
  try {
    const [results] = await db.execute(query, [user_mail, term_id]);
    const isBookmarked = results[0].isBookmarked > 0;
    res.json({
      success: true,
      isBookmarked: isBookmarked,
      message: isBookmarked
        ? "Urinary-system term is bookmarked"
        : "Urinary-system term is not bookmarked",
    });
  } catch (err) {
    console.error("Error checking urinary-system bookmark state:", err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

// Muscular System English

// Add a MuscleEnglish bookmark
exports.addMuscleEnglishBookmark = async (req, res) => {
  const { term_id } = req.body;
  const user_mail = req.user_mail;

  if (!term_id || !user_mail) {
    return res
      .status(400)
      .json({ success: false, message: "Missing required fields" });
  }

  const query = `INSERT INTO muscle_english_bookmarks (bookmark_by, term_id) VALUES (?, ?)`;
  try {
    await db.execute(query, [user_mail, term_id]);
    res.json({
      success: true,
      message: "Muscle English bookmark added successfully",
    });
  } catch (err) {
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
};

// Remove a Muscle English bookmark
exports.removeMuscleEnglishBookmark = async (req, res) => {
  const { term_id } = req.body;
  const user_mail = req.user_mail;

  if (!term_id || !user_mail) {
    return res
      .status(400)
      .json({ success: false, message: "Missing required fields" });
  }

  const query = `DELETE FROM muscle_english_bookmarks WHERE bookmark_by = ? AND term_id = ?`;
  try {
    await db.execute(query, [user_mail, term_id]);
    res.json({
      success: true,
      message: "Muscle English bookmark removed successfully",
    });
  } catch (err) {
    console.error("Error removing Muscle English bookmark:", err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

// Display all Muscle English bookmarks for the current user
exports.getMuscleEnglishBookmarks = async (req, res) => {
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
  try {
    const [results] = await db.execute(query, [user_mail]);
    res.json({ success: true, bookmarks: results });
  } catch (err) {
    console.error("Error fetching Muscle English bookmarks:", err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

// Check if a Muscle English term is bookmarked by the current user
exports.isMuscleEnglishBookmarked = async (req, res) => {
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
  try {
    const [results] = await db.execute(query, [user_mail, term_id]);
    const isBookmarked = results[0].isBookmarked > 0;
    res.json({
      success: true,
      isBookmarked: isBookmarked,
      message: isBookmarked
        ? "Muscle English term is bookmarked"
        : "Muscle English term is not bookmarked",
    });
  } catch (err) {
    console.error("Error checking Muscle English bookmark state:", err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

// Add a digestive-system bookmark
exports.addDigestiveSystemBookmark = async (req, res) => {
  const { term_id } = req.body;
  const user_mail = req.user_mail;

  if (!term_id || !user_mail) {
    return res
      .status(400)
      .json({ success: false, message: "Missing required fields" });
  }

  const query = `INSERT INTO digestive_system_bookmarks (bookmark_by, term_id) VALUES (?, ?)`;
  try {
    await db.execute(query, [user_mail, term_id]);
    res.json({
      success: true,
      message: "Digestive-system bookmark added successfully",
    });
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      return res
        .status(409)
        .json({ success: false, message: "Bookmark already exists" });
    }
    console.error("Error adding digestive-system bookmark:", err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

// Remove a digestive-system bookmark
exports.removeDigestiveSystemBookmark = async (req, res) => {
  const { term_id } = req.body;
  const user_mail = req.user_mail;

  if (!term_id || !user_mail) {
    return res
      .status(400)
      .json({ success: false, message: "Missing required fields" });
  }

  const query = `DELETE FROM digestive_system_bookmarks WHERE bookmark_by = ? AND term_id = ?`;
  try {
    await db.execute(query, [user_mail, term_id]);
    res.json({
      success: true,
      message: "Digestive-system bookmark removed successfully",
    });
  } catch (err) {
    console.error("Error removing digestive-system bookmark:", err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

// Display all digestive-system bookmarks for the current user
exports.getDigestiveSystemBookmarks = async (req, res) => {
  const user_mail = req.user_mail;

  if (!user_mail) {
    return res
      .status(400)
      .json({ success: false, message: "User not authenticated" });
  }

  const query = `
    SELECT c.term, c.id
    FROM digestive_system_bookmarks b
    JOIN digestive_system c ON b.term_id = c.id
    WHERE b.bookmark_by = ?
    ORDER BY c.term 
  `;
  try {
    const [results] = await db.execute(query, [user_mail]);
    res.json({ success: true, bookmarks: results });
  } catch (err) {
    console.error("Error fetching digestive-system bookmarks:", err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
// Check if a digestive-system term is bookmarked by the current user
exports.isDigestiveSystemBookmarked = async (req, res) => {
  const term_id = req.params.term_id;
  const user_mail = req.user_mail;

  if (!term_id || !user_mail) {
    return res
      .status(400)
      .json({ success: false, message: "Missing required fields" });
  }

  const query = `
    SELECT COUNT(*) AS isBookmarked
    FROM digestive_system_bookmarks
    WHERE bookmark_by = ? AND term_id = ?
  `;
  try {
    const [results] = await db.execute(query, [user_mail, term_id]);
    const isBookmarked = results[0].isBookmarked > 0;
    res.json({
      success: true,
      isBookmarked: isBookmarked,
      message: isBookmarked
        ? "Digestive-system term is bookmarked"
        : "Digestive-system term is not bookmarked",
    });
  } catch (err) {
    console.error("Error checking digestive-system bookmark state:", err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

// Add an immune-system bookmark
exports.addImmuneSystemBookmark = async (req, res) => {
  const { term_id } = req.body;
  const user_mail = req.user_mail;

  if (!term_id || !user_mail) {
    return res
      .status(400)
      .json({ success: false, message: "Missing required fields" });
  }

  const query = `INSERT INTO immune_system_bookmarks (bookmark_by, term_id) VALUES (?, ?)`;
  try {
    await db.execute(query, [user_mail, term_id]);
    res.json({
      success: true,
      message: "Immune-system bookmark added successfully",
    });
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      return res
        .status(409)
        .json({ success: false, message: "Bookmark already exists" });
    }
    console.error("Error adding immune-system bookmark:", err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

// Remove an immune-system bookmark
exports.removeImmuneSystemBookmark = async (req, res) => {
  const { term_id } = req.body;
  const user_mail = req.user_mail;

  if (!term_id || !user_mail) {
    return res
      .status(400)
      .json({ success: false, message: "Missing required fields" });
  }

  const query = `DELETE FROM immune_system_bookmarks WHERE bookmark_by = ? AND term_id = ?`;
  try {
    await db.execute(query, [user_mail, term_id]);
    res.json({
      success: true,
      message: "Immune-system bookmark removed successfully",
    });
  } catch (err) {
    console.error("Error removing immune-system bookmark:", err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

// Display all immune-system bookmarks for the current user
exports.getImmuneSystemBookmarks = async (req, res) => {
  const user_mail = req.user_mail;

  if (!user_mail) {
    return res
      .status(400)
      .json({ success: false, message: "User not authenticated" });
  }

  const query = `
    SELECT c.term, c.id
    FROM immune_system_bookmarks b
    JOIN immune_system c ON b.term_id = c.id
    WHERE b.bookmark_by = ?
    ORDER BY c.term 
  `;
  try {
    const [results] = await db.execute(query, [user_mail]);
    res.json({ success: true, bookmarks: results });
  } catch (err) {
    console.error("Error fetching immune-system bookmarks:", err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

// Check if an immune-system term is bookmarked by the current user
exports.isImmuneSystemBookmarked = async (req, res) => {
  const term_id = req.params.term_id;
  const user_mail = req.user_mail;

  if (!term_id || !user_mail) {
    return res
      .status(400)
      .json({ success: false, message: "Missing required fields" });
  }

  const query = `
    SELECT COUNT(*) AS isBookmarked
    FROM immune_system_bookmarks
    WHERE bookmark_by = ? AND term_id = ?
  `;
  try {
    const [results] = await db.execute(query, [user_mail, term_id]);
    const isBookmarked = results[0].isBookmarked > 0;
    res.json({
      success: true,
      isBookmarked: isBookmarked,
      message: isBookmarked
        ? "Immune-system term is bookmarked"
        : "Immune-system term is not bookmarked",
    });
  } catch (err) {
    console.error("Error checking immune-system bookmark state:", err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

// Add a joint-system bookmark
exports.addJointSystemBookmark = async (req, res) => {
  const { term_id } = req.body;
  const user_mail = req.user_mail;

  if (!term_id || !user_mail) {
    return res
      .status(400)
      .json({ success: false, message: "Missing required fields" });
  }

  const query = `INSERT INTO joint_system_bookmarks (bookmark_by, term_id) VALUES (?, ?)`;
  try {
    await db.execute(query, [user_mail, term_id]);
    res.json({
      success: true,
      message: "Joint-system bookmark added successfully",
    });
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      return res
        .status(409)
        .json({ success: false, message: "Bookmark already exists" });
    }
    console.error("Error adding joint-system bookmark:", err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

// Remove a joint-system bookmark
exports.removeJointSystemBookmark = async (req, res) => {
  const { term_id } = req.body;
  const user_mail = req.user_mail;

  if (!term_id || !user_mail) {
    return res
      .status(400)
      .json({ success: false, message: "Missing required fields" });
  }

  const query = `DELETE FROM joint_system_bookmarks WHERE bookmark_by = ? AND term_id = ?`;
  try {
    await db.execute(query, [user_mail, term_id]);
    res.json({
      success: true,
      message: "Joint-system bookmark removed successfully",
    });
  } catch (err) {
    console.error("Error removing joint-system bookmark:", err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

// Display all joint-system bookmarks for the current user
exports.getJointSystemBookmarks = async (req, res) => {
  const user_mail = req.user_mail;

  if (!user_mail) {
    return res
      .status(400)
      .json({ success: false, message: "User not authenticated" });
  }

  const query = `
    SELECT c.term, c.id
    FROM joint_system_bookmarks b
    JOIN joint_system c ON b.term_id = c.id
    WHERE b.bookmark_by = ?
    ORDER BY c.term 
  `;
  try {
    const [results] = await db.execute(query, [user_mail]);
    res.json({ success: true, bookmarks: results });
  } catch (err) {
    console.error("Error fetching joint-system bookmarks:", err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

// Check if a joint-system term is bookmarked by the current user
exports.isJointSystemBookmarked = async (req, res) => {
  const term_id = req.params.term_id;
  const user_mail = req.user_mail;

  if (!term_id || !user_mail) {
    return res
      .status(400)
      .json({ success: false, message: "Missing required fields" });
  }

  const query = `
    SELECT COUNT(*) AS isBookmarked
    FROM joint_system_bookmarks
    WHERE bookmark_by = ? AND term_id = ?
  `;
  try {
    const [results] = await db.execute(query, [user_mail, term_id]);
    const isBookmarked = results[0].isBookmarked > 0;
    res.json({
      success: true,
      isBookmarked: isBookmarked,
      message: isBookmarked
        ? "Joint-system term is bookmarked"
        : "Joint-system term is not bookmarked",
    });
  } catch (err) {
    console.error("Error checking joint-system bookmark state:", err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

// Add a muscular-system bookmark
exports.addMuscularSystemBookmark = async (req, res) => {
  const { term_id } = req.body;
  const user_mail = req.user_mail;

  if (!term_id || !user_mail) {
    return res
      .status(400)
      .json({ success: false, message: "Missing required fields" });
  }

  const query = `INSERT INTO muscular_system_bookmarks (bookmark_by, term_id) VALUES (?, ?)`;
  try {
    await db.execute(query, [user_mail, term_id]);
    res.json({
      success: true,
      message: "Muscular-system bookmark added successfully",
    });
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      return res
        .status(409)
        .json({ success: false, message: "Bookmark already exists" });
    }
    console.error("Error adding muscular-system bookmark:", err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

// Remove a muscular-system bookmark
exports.removeMuscularSystemBookmark = async (req, res) => {
  const { term_id } = req.body;
  const user_mail = req.user_mail;

  if (!term_id || !user_mail) {
    return res
      .status(400)
      .json({ success: false, message: "Missing required fields" });
  }

  const query = `DELETE FROM muscular_system_bookmarks WHERE bookmark_by = ? AND term_id = ?`;
  try {
    await db.execute(query, [user_mail, term_id]);
    res.json({
      success: true,
      message: "Muscular-system bookmark removed successfully",
    });
  } catch (err) {
    console.error("Error removing muscular-system bookmark:", err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

// Display all muscular-system bookmarks for the current user
exports.getMuscularSystemBookmarks = async (req, res) => {
  const user_mail = req.user_mail;

  if (!user_mail) {
    return res
      .status(400)
      .json({ success: false, message: "User not authenticated" });
  }

  const query = `
    SELECT c.term, c.id
    FROM muscular_system_bookmarks b
    JOIN muscular_system c ON b.term_id = c.id
    WHERE b.bookmark_by = ?
    ORDER BY c.term 
  `;
  try {
    const [results] = await db.execute(query, [user_mail]);
    res.json({ success: true, bookmarks: results });
  } catch (err) {
    console.error("Error fetching muscular-system bookmarks:", err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

// Check if a muscular-system term is bookmarked by the current user
exports.isMuscularSystemBookmarked = async (req, res) => {
  const term_id = req.params.term_id;
  const user_mail = req.user_mail;

  if (!term_id || !user_mail) {
    return res
      .status(400)
      .json({ success: false, message: "Missing required fields" });
  }

  const query = `
    SELECT COUNT(*) AS isBookmarked
    FROM muscular_system_bookmarks
    WHERE bookmark_by = ? AND term_id = ?
  `;
  try {
    const [results] = await db.execute(query, [user_mail, term_id]);
    const isBookmarked = results[0].isBookmarked > 0;
    res.json({
      success: true,
      isBookmarked: isBookmarked,
      message: isBookmarked
        ? "Muscular-system term is bookmarked"
        : "Muscular-system term is not bookmarked",
    });
  } catch (err) {
    console.error("Error checking muscular-system bookmark state:", err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
// Add a plane-system bookmark
exports.addPlaneSystemBookmark = async (req, res) => {
  const { term_id } = req.body;
  const user_mail = req.user_mail;

  if (!term_id || !user_mail) {
    return res
      .status(400)
      .json({ success: false, message: "Missing required fields" });
  }

  const query = `INSERT INTO plane_system_bookmarks (bookmark_by, term_id) VALUES (?, ?)`;
  try {
    await db.execute(query, [user_mail, term_id]);
    res.json({
      success: true,
      message: "Plane-system bookmark added successfully",
    });
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      return res
        .status(409)
        .json({ success: false, message: "Bookmark already exists" });
    }
    console.error("Error adding plane-system bookmark:", err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

// Remove a plane-system bookmark
exports.removePlaneSystemBookmark = async (req, res) => {
  const { term_id } = req.body;
  const user_mail = req.user_mail;

  if (!term_id || !user_mail) {
    return res
      .status(400)
      .json({ success: false, message: "Missing required fields" });
  }

  const query = `DELETE FROM plane_system_bookmarks WHERE bookmark_by = ? AND term_id = ?`;
  try {
    await db.execute(query, [user_mail, term_id]);
    res.json({
      success: true,
      message: "Plane-system bookmark removed successfully",
    });
  } catch (err) {
    console.error("Error removing plane-system bookmark:", err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

// Display all plane-system bookmarks for the current user
exports.getPlaneSystemBookmarks = async (req, res) => {
  const user_mail = req.user_mail;

  if (!user_mail) {
    return res
      .status(400)
      .json({ success: false, message: "User not authenticated" });
  }

  const query = `
    SELECT c.term, c.id
    FROM plane_system_bookmarks b
    JOIN plane_system c ON b.term_id = c.id
    WHERE b.bookmark_by = ?
    ORDER BY c.term 
  `;
  try {
    const [results] = await db.execute(query, [user_mail]);
    res.json({ success: true, bookmarks: results });
  } catch (err) {
    console.error("Error fetching plane-system bookmarks:", err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

// Check if a plane-system term is bookmarked by the current user
exports.isPlaneSystemBookmarked = async (req, res) => {
  const term_id = req.params.term_id;
  const user_mail = req.user_mail;

  if (!term_id || !user_mail) {
    return res
      .status(400)
      .json({ success: false, message: "Missing required fields" });
  }

  const query = `
    SELECT COUNT(*) AS isBookmarked
    FROM plane_system_bookmarks
    WHERE bookmark_by = ? AND term_id = ?
  `;
  try {
    const [results] = await db.execute(query, [user_mail, term_id]);
    const isBookmarked = results[0].isBookmarked > 0;
    res.json({
      success: true,
      isBookmarked: isBookmarked,
      message: isBookmarked
        ? "Plane-system term is bookmarked"
        : "Plane-system term is not bookmarked",
    });
  } catch (err) {
    console.error("Error checking plane-system bookmark state:", err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
