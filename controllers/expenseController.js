const db = require("../config/db");

exports.addExpense = async (req, res) => {
  const { user_id, amount, description, category } = req.body;

  const insertExpenseQuery = `
    INSERT INTO expenses (user_id, type, amount, timestamp)
    VALUES (?, 'expense', ?, NOW())
  `;

  const updateFinancialSummaryQuery = `
    INSERT INTO user_financial_summary (user_id, current_balance, net_savings, total_expenses, last_updated)
    VALUES (?, ?, 0, ?, NOW())
    ON DUPLICATE KEY UPDATE
      current_balance = current_balance - ?, total_expenses = total_expenses + ?, last_updated = NOW()
  `;

  try {
    await db.execute(insertExpenseQuery, [user_id, amount]);
    await db.execute(updateFinancialSummaryQuery, [
      user_id,
      -amount,
      amount,
      amount,
      amount,
    ]);
    res
      .status(201)
      .json({ success: true, message: "Expense added successfully" });
  } catch (err) {
    console.error("Error adding expense:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.updateExpense = async (req, res) => {
  const { expense_id, amount, description, category } = req.body;
  const query = `UPDATE expenses SET amount = ?, description = ?, category = ? WHERE expense_id = ?`;

  try {
    await db.execute(query, [amount, description, category, expense_id]);
    res.json({ success: true, message: "Expense updated successfully" });
  } catch (err) {
    console.error("Error updating expense:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.deleteExpense = async (req, res) => {
  const { expense_id } = req.params;
  const query = `DELETE FROM expenses WHERE expense_id = ?`;

  try {
    await db.execute(query, [expense_id]);
    res.json({ success: true, message: "Expense deleted successfully" });
  } catch (err) {
    console.error("Error deleting expense:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.getExpenses = async (req, res) => {
  const { user_id } = req.params;

  const query = `SELECT * FROM expenses WHERE user_id = ?`;

  try {
    const [results] = await db.execute(query, [user_id]);
    res.json({ success: true, data: results });
  } catch (err) {
    console.error("Error fetching expenses:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
