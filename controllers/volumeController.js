const db = require("../config/db");

exports.getVolumes = (req, res) => {
  const query = "SELECT title, status FROM volume";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching volumes:", err);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
    res.json({ success: true, volumes: results });
  });
};

exports.getSkeletalTerms = (req, res) => {
  const query = "SELECT term, id FROM skeletal_system ORDER BY term";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching skeletal terms:", err);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
    res.json({ success: true, terms: results });
  });
};

exports.getPlaneTerms = (req, res) => {
  const query = "SELECT term, id FROM plane_system ORDER BY term";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching Plane and Directional Terms:", err);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
    res.json({ success: true, terms: results });
  });
};

exports.getSampleTerms = (req, res) => {
  const query = "SELECT term, id FROM sample_term ORDER BY term";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching Sample Terms:", err);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
    res.json({ success: true, terms: results });
  });
};

exports.getSampleTermDetails = (req, res) => {
  const id = req.params.id;
  const query = `SELECT * FROM sample_term WHERE id = ?`;

  db.query(query, [id], (err, results) => {
    if (err) {
      console.error("Error fetching term details:", err);
      res.status(500).send("Error fetching term details");
    } else {
      res.json(results[0]);
    }
  });
};

exports.getSkeletalTermDetails = (req, res) => {
  const id = req.params.id;
  const query = `SELECT * FROM skeletal_system WHERE id = ?`;

  db.query(query, [id], (err, results) => {
    if (err) {
      console.error("Error fetching term details:", err);
      res.status(500).send("Error fetching term details");
    } else {
      res.json(results[0]);
    }
  });
};
