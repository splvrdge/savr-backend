const db = require("../config/db");

exports.addIncome = async (req, res) => {
  const { user_id, amount, description, category } = req.body;

  const insertIncomeQuery = `
    INSERT INTO user_financial_data (user_id, type, amount, timestamp)
    VALUES (?, 'income', ?, NOW())
  `;

  const updateFinancialSummaryQuery = `
    INSERT INTO user_financial_summary (user_id, current_balance, net_savings, total_expenses, last_updated)
    VALUES (?, ?, ?, 0, NOW())
    ON DUPLICATE KEY UPDATE
      current_balance = current_balance + ?, net_savings = net_savings + ?, last_updated = NOW()
  `;

  try {
    await db.execute(insertIncomeQuery, [user_id, amount]);

    await db.execute(updateFinancialSummaryQuery, [
      user_id,
      amount,
      amount,
      amount,
      amount,
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
