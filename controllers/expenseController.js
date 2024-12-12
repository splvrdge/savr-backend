const db = require("../config/db");

exports.addExpense = async (req, res) => {
  const { user_id, amount, description, category } = req.body;
  const timestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');

  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();

    // Insert into user_financial_data
    const insertQuery = `
      INSERT INTO user_financial_data (user_id, amount, description, category, type, timestamp)
      VALUES (?, ?, ?, ?, 'expense', ?)
    `;
    await connection.execute(insertQuery, [user_id, amount, description, category, timestamp]);

    // Update financial summary
    const updateSummaryQuery = `
      INSERT INTO user_financial_summary (user_id, current_balance, total_expenses)
      VALUES (?, -?, ?)
      ON DUPLICATE KEY UPDATE
      current_balance = current_balance - ?,
      total_expenses = total_expenses + ?
    `;
    await connection.execute(updateSummaryQuery, [user_id, amount, amount, amount, amount]);

    await connection.commit();
    res.status(201).json({ success: true, message: "Expense added successfully" });
  } catch (err) {
    await connection.rollback();
    console.error("Error adding expense:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  } finally {
    connection.release();
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
  const query = `
    SELECT 
      id,
      amount,
      description,
      category,
      timestamp,
      type
    FROM user_financial_data 
    WHERE user_id = ? AND type = 'expense'
    ORDER BY timestamp DESC
  `;

  try {
    const [results] = await db.execute(query, [user_id]);
    
    // Map the results to match the frontend's expected format
    const formattedResults = results.map(item => ({
      id: item.id,
      amount: parseFloat(item.amount),
      description: item.description || '',
      category: item.category || 'Other',
      timestamp: item.timestamp,
      type: item.type
    }));
    
    res.json({ 
      success: true, 
      data: formattedResults 
    });
  } catch (err) {
    console.error("Error fetching expenses:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
