const db = require("../config/db");

exports.getExpensesByCategory = async (req, res) => {
  const { user_id } = req.params;
  const { timeframe } = req.query; // 'week', 'month', 'year'

  let dateFilter = '';
  switch (timeframe) {
    case 'week':
      dateFilter = 'AND timestamp >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)';
      break;
    case 'month':
      dateFilter = 'AND timestamp >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)';
      break;
    case 'year':
      dateFilter = 'AND timestamp >= DATE_SUB(CURDATE(), INTERVAL 1 YEAR)';
      break;
    default:
      dateFilter = 'AND timestamp >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)';
  }

  const query = `
    SELECT 
      category,
      SUM(amount) as total_amount,
      COUNT(*) as transaction_count
    FROM expenses
    WHERE user_id = ? ${dateFilter}
    GROUP BY category
    ORDER BY total_amount DESC
  `;

  try {
    const [results] = await db.execute(query, [user_id]);
    res.json({ success: true, data: results });
  } catch (err) {
    console.error("Error fetching expense analytics:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.getIncomeByCategory = async (req, res) => {
  const { user_id } = req.params;
  const { timeframe } = req.query;

  let dateFilter = '';
  switch (timeframe) {
    case 'week':
      dateFilter = 'AND timestamp >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)';
      break;
    case 'month':
      dateFilter = 'AND timestamp >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)';
      break;
    case 'year':
      dateFilter = 'AND timestamp >= DATE_SUB(CURDATE(), INTERVAL 1 YEAR)';
      break;
    default:
      dateFilter = 'AND timestamp >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)';
  }

  const query = `
    SELECT 
      category,
      SUM(amount) as total_amount,
      COUNT(*) as transaction_count
    FROM income
    WHERE user_id = ? ${dateFilter}
    GROUP BY category
    ORDER BY total_amount DESC
  `;

  try {
    const [results] = await db.execute(query, [user_id]);
    res.json({ success: true, data: results });
  } catch (err) {
    console.error("Error fetching income analytics:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.getMonthlyTrends = async (req, res) => {
  const { user_id } = req.params;
  
  const query = `
    SELECT 
      'expense' as type,
      DATE_FORMAT(timestamp, '%Y-%m') as month,
      SUM(amount) as total_amount
    FROM expenses
    WHERE user_id = ? 
    AND timestamp >= DATE_SUB(CURDATE(), INTERVAL 12 MONTH)
    GROUP BY DATE_FORMAT(timestamp, '%Y-%m')
    
    UNION ALL
    
    SELECT 
      'income' as type,
      DATE_FORMAT(timestamp, '%Y-%m') as month,
      SUM(amount) as total_amount
    FROM income
    WHERE user_id = ?
    AND timestamp >= DATE_SUB(CURDATE(), INTERVAL 12 MONTH)
    GROUP BY DATE_FORMAT(timestamp, '%Y-%m')
    
    ORDER BY month, type
  `;

  try {
    const [results] = await db.execute(query, [user_id, user_id]);
    
    // Organize data by month
    const monthlyData = {};
    results.forEach(row => {
      if (!monthlyData[row.month]) {
        monthlyData[row.month] = { month: row.month, income: 0, expense: 0 };
      }
      monthlyData[row.month][row.type] = row.total_amount;
    });

    res.json({ 
      success: true, 
      data: Object.values(monthlyData)
    });
  } catch (err) {
    console.error("Error fetching monthly trends:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
