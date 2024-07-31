const db = require("../config/db");

exports.getVolumes = (req, res) => {
  const query = `
    SELECT * FROM volume
    ORDER BY 
      CASE 
        WHEN volume_id = 1 THEN 0 
        ELSE 1 
      END, 
      title
  `;
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

exports.getCardiovascularTerms = (req, res) => {
  const query = "SELECT term, id FROM cardiovascular_system ORDER BY term";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching Cardiovascular Terms:", err);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
    res.json({ success: true, terms: results });
  });
};

exports.getCardiovascularTermDetails = (req, res) => {
  const id = req.params.id;
  const query = `SELECT * FROM cardiovascular_system WHERE id = ?`;

  db.query(query, [id], (err, results) => {
    if (err) {
      console.error("Error fetching term details:", err);
      res.status(500).send("Error fetching term details");
    } else {
      res.json(results[0]);
    }
  });
};

exports.getIntegumentaryTerms = (req, res) => {
  const query = "SELECT term, id FROM integumentary_system ORDER BY term";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching Integumentary Terms:", err);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
    res.json({ success: true, terms: results });
  });
};

exports.getIntegumentaryTermDetails = (req, res) => {
  const id = req.params.id;
  const query = `SELECT * FROM integumentary_system WHERE id = ?`;

  db.query(query, [id], (err, results) => {
    if (err) {
      console.error("Error fetching term details:", err);
      res.status(500).send("Error fetching term details");
    } else {
      res.json(results[0]);
    }
  });
};

exports.getNervousTerms = (req, res) => {
  const query = "SELECT term, id FROM nervous_system ORDER BY term";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching Nervous Terms:", err);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
    res.json({ success: true, terms: results });
  });
};

exports.getNervousTermDetails = (req, res) => {
  const id = req.params.id;
  const query = `SELECT * FROM nervous_system WHERE id = ?`;

  db.query(query, [id], (err, results) => {
    if (err) {
      console.error("Error fetching term details:", err);
      res.status(500).send("Error fetching term details");
    } else {
      res.json(results[0]);
    }
  });
};

exports.getReproductiveTerms = (req, res) => {
  const query = "SELECT term, id FROM reproductive_system ORDER BY term";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching Reproductive Terms:", err);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
    res.json({ success: true, terms: results });
  });
};

exports.getReproductiveTermDetails = (req, res) => {
  const id = req.params.id;
  const query = `SELECT * FROM reproductive_system WHERE id = ?`;

  db.query(query, [id], (err, results) => {
    if (err) {
      console.error("Error fetching term details:", err);
      res.status(500).send("Error fetching term details");
    } else {
      res.json(results[0]);
    }
  });
};

exports.getRespiratoryTerms = (req, res) => {
  const query = "SELECT term, id FROM respiratory_system ORDER BY term";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching Respiratory Terms:", err);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
    res.json({ success: true, terms: results });
  });
};

exports.getRespiratoryTermDetails = (req, res) => {
  const id = req.params.id;
  const query = `SELECT * FROM respiratory_system WHERE id = ?`;

  db.query(query, [id], (err, results) => {
    if (err) {
      console.error("Error fetching term details:", err);
      res.status(500).send("Error fetching term details");
    } else {
      res.json(results[0]);
    }
  });
};

exports.getUrinaryTerms = (req, res) => {
  const query = "SELECT term, id FROM urinary_system ORDER BY term";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching Urinary Terms:", err);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
    res.json({ success: true, terms: results });
  });
};

exports.getUrinaryTermDetails = (req, res) => {
  const id = req.params.id;
  const query = `SELECT * FROM urinary_system WHERE id = ?`;

  db.query(query, [id], (err, results) => {
    if (err) {
      console.error("Error fetching term details:", err);
      res.status(500).send("Error fetching term details");
    } else {
      res.json(results[0]);
    }
  });
};

exports.getMuscleEnglishTerms = (req, res) => {
  const query = "SELECT term, id FROM muscle_english ORDER BY term";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching Muscular System English Terms:", err);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
    res.json({ success: true, terms: results });
  });
};

exports.getMuscleEnglishTermDetails = (req, res) => {
  const id = req.params.id;
  const query = `SELECT * FROM muscle_english WHERE id = ?`;

  db.query(query, [id], (err, results) => {
    if (err) {
      console.error("Error fetching term details:", err);
      res.status(500).send("Error fetching term details");
    } else {
      res.json(results[0]);
    }
  });
};
