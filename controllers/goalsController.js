const db = require("../config/db");

exports.addGoal = async (req, res) => {
  const { user_id, title, target_amount, target_date } = req.body;
  const query = `
    INSERT INTO goals (
      user_id, title, target_amount, target_date
    ) VALUES (?, ?, ?, ?)
  `;

  try {
    const [results] = await db.execute(query, [
      user_id,
      title,
      target_amount,
      target_date,
    ]);
    res.status(201).json({ 
      success: true, 
      message: "Goal added successfully",
      goal_id: results.insertId
    });
  } catch (err) {
    console.error("Error adding goal:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.getGoals = async (req, res) => {
  const { user_id } = req.params;
  const query = `
    SELECT 
      goal_id,
      user_id,
      title,
      target_amount,
      current_amount,
      target_date,
      created_at,
      updated_at,
      DATEDIFF(target_date, CURDATE()) as days_remaining,
      (current_amount / target_amount * 100) as progress_percentage
    FROM goals
    WHERE user_id = ?
    ORDER BY created_at DESC
  `;

  try {
    const [results] = await db.execute(query, [user_id]);
    res.json({ success: true, data: results });
  } catch (err) {
    console.error("Error fetching goals:", err);
    res.status(500).json({ success: false, message: err.message || "Internal server error" });
  }
};

exports.updateGoal = async (req, res) => {
  const { goal_id } = req.params;
  const { title, target_amount, target_date } = req.body;
  const query = `
    UPDATE goals 
    SET title = ?, 
        target_amount = ?, 
        target_date = ?
    WHERE goal_id = ?
  `;

  try {
    await db.execute(query, [
      title,
      target_amount,
      target_date,
      goal_id
    ]);
    res.json({ success: true, message: "Goal updated successfully" });
  } catch (err) {
    console.error("Error updating goal:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.deleteGoal = async (req, res) => {
  const { goal_id } = req.params;
  const query = `DELETE FROM goals WHERE goal_id = ?`;

  try {
    await db.execute(query, [goal_id]);
    res.json({ success: true, message: "Goal deleted successfully" });
  } catch (err) {
    console.error("Error deleting goal:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// New contribution-related endpoints
exports.addContribution = async (req, res) => {
  const { goal_id, user_id, amount, notes } = req.body;
  
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();

    // Add contribution
    const [contribution] = await connection.execute(
      `INSERT INTO goal_contributions (goal_id, user_id, amount, notes) 
       VALUES (?, ?, ?, ?)`,
      [goal_id, user_id, amount, notes]
    );

    // The triggers will automatically update the goal's progress

    await connection.commit();
    
    res.status(201).json({ 
      success: true, 
      message: "Contribution added successfully",
      contribution_id: contribution.insertId
    });
  } catch (err) {
    await connection.rollback();
    console.error("Error adding contribution:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  } finally {
    connection.release();
  }
};

exports.getContributions = async (req, res) => {
  const { goal_id } = req.params;
  const query = `
    SELECT 
      gc.*,
      DATE_FORMAT(gc.contribution_date, '%Y-%m-%d') as formatted_date
    FROM goal_contributions gc
    WHERE gc.goal_id = ?
    ORDER BY gc.contribution_date DESC
  `;

  try {
    const [results] = await db.execute(query, [goal_id]);
    res.json({ success: true, data: results });
  } catch (err) {
    console.error("Error fetching contributions:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.deleteContribution = async (req, res) => {
  const { contribution_id } = req.params;
  
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();

    // Delete contribution
    await connection.execute(
      'DELETE FROM goal_contributions WHERE contribution_id = ?',
      [contribution_id]
    );

    // The triggers will automatically update the goal's progress

    await connection.commit();
    res.json({ success: true, message: "Contribution deleted successfully" });
  } catch (err) {
    await connection.rollback();
    console.error("Error deleting contribution:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  } finally {
    connection.release();
  }
};
