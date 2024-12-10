const db = require("../config/db");

exports.addIncome = async (req, res) => {
  const { user_id, amount, description, category } = req.body;
  const query = `INSERT INTO incomes (user_id, amount, description, category) VALUES (?, ?, ?, ?)`;

  try {
    const [results] = await db.execute(query, [
      user_id,
      amount,
      description,
      category,
    ]);
    res
      .status(201)
      .json({ success: true, message: "Income added successfully" });
  } catch (err) {
    console.error("Error adding income:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.getIncomes = async (req, res) => {
  const { user_id } = req.params;
  const query = `SELECT * FROM incomes WHERE user_id = ?`;

  try {
    const [results] = await db.execute(query, [user_id]);
    res.json({ success: true, data: results });
  } catch (err) {
    console.error("Error fetching incomes:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.updateIncome = async (req, res) => {
  const { income_id, amount, description, category } = req.body;
  const query = `UPDATE incomes SET amount = ?, description = ?, category = ? WHERE income_id = ?`;

  try {
    await db.execute(query, [amount, description, category, income_id]);
    res.json({ success: true, message: "Income updated successfully" });
  } catch (err) {
    console.error("Error updating income:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.deleteIncome = async (req, res) => {
  const { income_id } = req.params;
  const query = `DELETE FROM incomes WHERE income_id = ?`;

  try {
    await db.execute(query, [income_id]);
    res.json({ success: true, message: "Income deleted successfully" });
  } catch (err) {
    console.error("Error deleting income:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
