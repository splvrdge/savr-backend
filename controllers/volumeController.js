const db = require("../config/db");

// Get all volumes
exports.getVolumes = async (req, res) => {
  const query = `
    SELECT * FROM volume
    ORDER BY 
      CASE 
        WHEN volume_id = 1 THEN 0 
        ELSE 1 
      END, 
      title
  `;
  try {
    const [results] = await db.execute(query);
    res.json({ success: true, volumes: results });
  } catch (err) {
    console.error("Error fetching volumes:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Get sample terms
exports.getSampleTerms = async (req, res) => {
  const query = "SELECT term, id FROM sample_term ORDER BY term";
  try {
    const [results] = await db.execute(query);
    res.json({ success: true, terms: results });
  } catch (err) {
    console.error("Error fetching Sample Terms:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Get details of a sample term
exports.getSampleTermDetails = async (req, res) => {
  const id = req.params.id;
  const query = `SELECT * FROM sample_term WHERE id = ?`;

  try {
    const [results] = await db.execute(query, [id]);
    if (results.length > 0) {
      res.json(results[0]);
    } else {
      res.status(404).json({ success: false, message: "Term not found" });
    }
  } catch (err) {
    console.error("Error fetching term details:", err);
    res.status(500).send("Error fetching term details");
  }
};

// Get skeletal terms
exports.getSkeletalTerms = async (req, res) => {
  const query = "SELECT term, id FROM skeletal_system ORDER BY term";
  try {
    const [results] = await db.execute(query);
    res.json({ success: true, terms: results });
  } catch (err) {
    console.error("Error fetching skeletal terms:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Get details of a skeletal term
exports.getSkeletalTermDetails = async (req, res) => {
  const id = req.params.id;
  const query = `SELECT * FROM skeletal_system WHERE id = ?`;

  try {
    const [results] = await db.execute(query, [id]);
    if (results.length > 0) {
      res.json(results[0]);
    } else {
      res.status(404).json({ success: false, message: "Term not found" });
    }
  } catch (err) {
    console.error("Error fetching term details:", err);
    res.status(500).send("Error fetching term details");
  }
};

// Get cardiovascular terms
exports.getCardiovascularTerms = async (req, res) => {
  const query = "SELECT term, id FROM cardiovascular_system ORDER BY term";
  try {
    const [results] = await db.execute(query);
    res.json({ success: true, terms: results });
  } catch (err) {
    console.error("Error fetching Cardiovascular Terms:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Get details of a cardiovascular term
exports.getCardiovascularTermDetails = async (req, res) => {
  const id = req.params.id;
  const query = `SELECT * FROM cardiovascular_system WHERE id = ?`;

  try {
    const [results] = await db.execute(query, [id]);
    if (results.length > 0) {
      res.json(results[0]);
    } else {
      res.status(404).json({ success: false, message: "Term not found" });
    }
  } catch (err) {
    console.error("Error fetching term details:", err);
    res.status(500).send("Error fetching term details");
  }
};

// Get integumentary terms
exports.getIntegumentaryTerms = async (req, res) => {
  const query = "SELECT term, id FROM integumentary_system ORDER BY term";
  try {
    const [results] = await db.execute(query);
    res.json({ success: true, terms: results });
  } catch (err) {
    console.error("Error fetching Integumentary Terms:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Get details of an integumentary term
exports.getIntegumentaryTermDetails = async (req, res) => {
  const id = req.params.id;
  const query = `SELECT * FROM integumentary_system WHERE id = ?`;

  try {
    const [results] = await db.execute(query, [id]);
    if (results.length > 0) {
      res.json(results[0]);
    } else {
      res.status(404).json({ success: false, message: "Term not found" });
    }
  } catch (err) {
    console.error("Error fetching term details:", err);
    res.status(500).send("Error fetching term details");
  }
};

// Get nervous terms
exports.getNervousTerms = async (req, res) => {
  const query = "SELECT term, id FROM nervous_system ORDER BY term";
  try {
    const [results] = await db.execute(query);
    res.json({ success: true, terms: results });
  } catch (err) {
    console.error("Error fetching Nervous Terms:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Get details of a nervous term
exports.getNervousTermDetails = async (req, res) => {
  const id = req.params.id;
  const query = `SELECT * FROM nervous_system WHERE id = ?`;

  try {
    const [results] = await db.execute(query, [id]);
    if (results.length > 0) {
      res.json(results[0]);
    } else {
      res.status(404).json({ success: false, message: "Term not found" });
    }
  } catch (err) {
    console.error("Error fetching term details:", err);
    res.status(500).send("Error fetching term details");
  }
};

// Get reproductive terms
exports.getReproductiveTerms = async (req, res) => {
  const query = "SELECT term, id FROM reproductive_system ORDER BY term";
  try {
    const [results] = await db.execute(query);
    res.json({ success: true, terms: results });
  } catch (err) {
    console.error("Error fetching Reproductive Terms:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Get details of a reproductive term
exports.getReproductiveTermDetails = async (req, res) => {
  const id = req.params.id;
  const query = `SELECT * FROM reproductive_system WHERE id = ?`;

  try {
    const [results] = await db.execute(query, [id]);
    if (results.length > 0) {
      res.json(results[0]);
    } else {
      res.status(404).json({ success: false, message: "Term not found" });
    }
  } catch (err) {
    console.error("Error fetching term details:", err);
    res.status(500).send("Error fetching term details");
  }
};
// Get respiratory terms
exports.getRespiratoryTerms = async (req, res) => {
  const query = "SELECT term, id FROM respiratory_system ORDER BY term";
  try {
    const [results] = await db.execute(query);
    res.json({ success: true, terms: results });
  } catch (err) {
    console.error("Error fetching Respiratory Terms:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Get details of a respiratory term
exports.getRespiratoryTermDetails = async (req, res) => {
  const id = req.params.id;
  const query = `SELECT * FROM respiratory_system WHERE id = ?`;

  try {
    const [results] = await db.execute(query, [id]);
    if (results.length > 0) {
      res.json(results[0]);
    } else {
      res.status(404).json({ success: false, message: "Term not found" });
    }
  } catch (err) {
    console.error("Error fetching term details:", err);
    res.status(500).send("Error fetching term details");
  }
};

// Get urinary terms
exports.getUrinaryTerms = async (req, res) => {
  const query = "SELECT term, id FROM urinary_system ORDER BY term";
  try {
    const [results] = await db.execute(query);
    res.json({ success: true, terms: results });
  } catch (err) {
    console.error("Error fetching Urinary Terms:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Get details of a urinary term
exports.getUrinaryTermDetails = async (req, res) => {
  const id = req.params.id;
  const query = `SELECT * FROM urinary_system WHERE id = ?`;

  try {
    const [results] = await db.execute(query, [id]);
    if (results.length > 0) {
      res.json(results[0]);
    } else {
      res.status(404).json({ success: false, message: "Term not found" });
    }
  } catch (err) {
    console.error("Error fetching term details:", err);
    res.status(500).send("Error fetching term details");
  }
};

// Get muscle English terms
exports.getMuscleEnglishTerms = async (req, res) => {
  const query = "SELECT term, id FROM muscle_english ORDER BY term";
  try {
    const [results] = await db.execute(query);
    res.json({ success: true, terms: results });
  } catch (err) {
    console.error("Error fetching Muscular System English Terms:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Get details of a muscle English term
exports.getMuscleEnglishTermDetails = async (req, res) => {
  const id = req.params.id;
  const query = `SELECT * FROM muscle_english WHERE id = ?`;

  try {
    const [results] = await db.execute(query, [id]);
    if (results.length > 0) {
      res.json(results[0]);
    } else {
      res.status(404).json({ success: false, message: "Term not found" });
    }
  } catch (err) {
    console.error("Error fetching term details:", err);
    res.status(500).send("Error fetching term details");
  }
};

// Get digestive terms
exports.getDigestiveTerms = async (req, res) => {
  const query = "SELECT term, id FROM digestive_system ORDER BY term";
  try {
    const [results] = await db.execute(query);
    res.json({ success: true, terms: results });
  } catch (err) {
    console.error("Error fetching Digestive Terms:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Get immune terms
exports.getImmuneTerms = async (req, res) => {
  const query = "SELECT term, id FROM immune_system ORDER BY term";
  try {
    const [results] = await db.execute(query);
    res.json({ success: true, terms: results });
  } catch (err) {
    console.error("Error fetching Immune Terms:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Get joint terms
exports.getJointTerms = async (req, res) => {
  const query = "SELECT term, id FROM joint_system ORDER BY term";
  try {
    const [results] = await db.execute(query);
    res.json({ success: true, terms: results });
  } catch (err) {
    console.error("Error fetching Joint Terms:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Get muscular terms
exports.getMuscularTerms = async (req, res) => {
  const query = "SELECT term, id FROM muscular_system ORDER BY term";
  try {
    const [results] = await db.execute(query);
    res.json({ success: true, terms: results });
  } catch (err) {
    console.error("Error fetching Muscular Terms:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Get plane terms
exports.getPlaneTerms = async (req, res) => {
  const query = "SELECT term, id FROM plane_system ORDER BY term";
  try {
    const [results] = await db.execute(query);
    res.json({ success: true, terms: results });
  } catch (err) {
    console.error("Error fetching Plane Terms:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Get details of a digestive term
exports.getDigestiveTermDetails = async (req, res) => {
  const id = req.params.id;
  const query = `SELECT * FROM digestive_system WHERE id = ?`;

  try {
    const [results] = await db.execute(query, [id]);
    if (results.length > 0) {
      res.json(results[0]);
    } else {
      res.status(404).json({ success: false, message: "Term not found" });
    }
  } catch (err) {
    console.error("Error fetching Digestive term details:", err);
    res.status(500).send("Error fetching term details");
  }
};

// Get details of an immune term
exports.getImmuneTermDetails = async (req, res) => {
  const id = req.params.id;
  const query = `SELECT * FROM immune_system WHERE id = ?`;

  try {
    const [results] = await db.execute(query, [id]);
    if (results.length > 0) {
      res.json(results[0]);
    } else {
      res.status(404).json({ success: false, message: "Term not found" });
    }
  } catch (err) {
    console.error("Error fetching Immune term details:", err);
    res.status(500).send("Error fetching term details");
  }
};

// Get details of a joint term
exports.getJointTermDetails = async (req, res) => {
  const id = req.params.id;
  const query = `SELECT * FROM joint_system WHERE id = ?`;

  try {
    const [results] = await db.execute(query, [id]);
    if (results.length > 0) {
      res.json(results[0]);
    } else {
      res.status(404).json({ success: false, message: "Term not found" });
    }
  } catch (err) {
    console.error("Error fetching Joint term details:", err);
    res.status(500).send("Error fetching term details");
  }
};

// Get details of a muscular term
exports.getMuscularTermDetails = async (req, res) => {
  const id = req.params.id;
  const query = `SELECT * FROM muscular_system WHERE id = ?`;

  try {
    const [results] = await db.execute(query, [id]);
    if (results.length > 0) {
      res.json(results[0]);
    } else {
      res.status(404).json({ success: false, message: "Term not found" });
    }
  } catch (err) {
    console.error("Error fetching Muscular term details:", err);
    res.status(500).send("Error fetching term details");
  }
};

// Get details of a plane term
exports.getPlaneTermDetails = async (req, res) => {
  const id = req.params.id;
  const query = `SELECT * FROM plane_system WHERE id = ?`;

  try {
    const [results] = await db.execute(query, [id]);
    if (results.length > 0) {
      res.json(results[0]);
    } else {
      res.status(404).json({ success: false, message: "Term not found" });
    }
  } catch (err) {
    console.error("Error fetching Plane term details:", err);
    res.status(500).send("Error fetching term details");
  }
};
