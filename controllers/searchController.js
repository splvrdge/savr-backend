const db = require("../config/db");

exports.searchSampleTerms = (req, res) => {
  const searchTerm = req.query.q;

  if (!searchTerm) {
    return res
      .status(400)
      .json({ success: false, message: "Search term is required" });
  }

  const query = `
    SELECT term, id FROM sample_term WHERE term LIKE ?
  `;

  const searchValue = `%${searchTerm}%`;

  db.query(query, [searchValue], (err, results) => {
    if (err) {
      console.error("Error executing search query:", err);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }

    res.json({ success: true, terms: results });
  });
};

exports.searchSkeletalSystemTerms = (req, res) => {
  const searchTerm = req.query.q;

  if (!searchTerm) {
    return res
      .status(400)
      .json({ success: false, message: "Search term is required" });
  }

  const query = `
    SELECT term, id FROM skeletal_system WHERE term LIKE ?
  `;

  const searchValue = `%${searchTerm}%`;

  db.query(query, [searchValue], (err, results) => {
    if (err) {
      console.error("Error executing search query:", err);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }

    res.json({ success: true, terms: results });
  });
};
