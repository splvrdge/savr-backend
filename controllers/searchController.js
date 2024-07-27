const db = require("../config/db");

// Helper function to normalize and sort characters in a string
const normalizeString = (str) => {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "")
    .split("")
    .sort()
    .join("");
};

// Search function
const searchTerms = (query, terms) => {
  const normalizedQuery = normalizeString(query);
  return terms.filter((term) =>
    normalizeString(term).includes(normalizedQuery)
  );
};

exports.searchSampleTerms = async (req, res) => {
  try {
    const query = req.query.q;
    if (!query) {
      return res
        .status(400)
        .json({ success: false, message: "Query is required" });
    }

    const [results] = await db.execute("SELECT term FROM sample_terms");
    const terms = results.map((row) => row.term);
    const matchedTerms = searchTerms(query, terms);

    res.json({ success: true, terms: matchedTerms });
  } catch (error) {
    console.error("Error fetching sample terms:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.searchSkeletalSystemTerms = async (req, res) => {
  try {
    const query = req.query.q;
    if (!query) {
      return res
        .status(400)
        .json({ success: false, message: "Query is required" });
    }

    const [results] = await db.execute("SELECT term FROM skeletal_system");
    const terms = results.map((row) => row.term);
    const matchedTerms = searchTerms(query, terms);

    res.json({ success: true, terms: matchedTerms });
  } catch (error) {
    console.error("Error fetching skeletal system terms:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
