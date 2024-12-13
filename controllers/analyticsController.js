const db = require("../config/db");

exports.getExpensesByCategory = async (req, res) => {
  const { user_id } = req.params;
  const { timeframe } = req.query;

  let dateFilter = '';
  switch (timeframe) {
    case 'week':
      dateFilter = 'AND date >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)';
      break;
    case 'month':
      dateFilter = 'AND date >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)';
      break;
    case 'year':
      dateFilter = 'AND date >= DATE_SUB(CURDATE(), INTERVAL 1 YEAR)';
      break;
    default:
      dateFilter = 'AND date >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)';
  }

  const query = `
    SELECT 
      category,
      SUM(amount) as total_amount,
      COUNT(*) as transaction_count,
      ROUND((SUM(amount) / (
        SELECT SUM(amount) 
        FROM expenses 
        WHERE user_id = ? ${dateFilter}
      )) * 100, 2) as percentage
    FROM expenses
    WHERE user_id = ? ${dateFilter}
    GROUP BY category
    ORDER BY total_amount DESC
  `;

  try {
    const [results] = await db.execute(query, [user_id, user_id]);
    
    const formattedData = results.map(item => ({
      ...item,
      total_amount: parseFloat(item.total_amount),
      percentage: parseFloat(item.percentage) || 0
    }));

    res.json({ 
      success: true, 
      data: formattedData,
      total: formattedData.reduce((sum, item) => sum + item.total_amount, 0)
    });
  } catch (err) {
    console.error("Error fetching expense analytics:", err);
    res.status(500).json({ 
      success: false, 
      message: "Failed to fetch expense analytics",
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
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
    FROM incomes
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
    FROM incomes
    WHERE user_id = ?
    AND timestamp >= DATE_SUB(CURDATE(), INTERVAL 12 MONTH)
    GROUP BY DATE_FORMAT(timestamp, '%Y-%m')
    ORDER BY month ASC
  `;

  try {
    const [results] = await db.execute(query, [user_id, user_id]);
    
    // Transform the data into the required format
    const monthlyData = {};
    results.forEach(row => {
      if (!monthlyData[row.month]) {
        monthlyData[row.month] = { month: row.month, income: 0, expense: 0 };
      }
      if (row.type === 'income') {
        monthlyData[row.month].income = row.total_amount;
      } else {
        monthlyData[row.month].expense = row.total_amount;
      }
    });

    const formattedData = Object.values(monthlyData);
    res.json({ success: true, data: formattedData });
  } catch (err) {
    console.error("Error fetching monthly trends:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.getDailyContributions = async (req, res) => {
  const { user_id } = req.params;
  const { timeframe = 'year' } = req.query;

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
      dateFilter = 'AND timestamp >= DATE_SUB(CURDATE(), INTERVAL 1 YEAR)';
  }
  
  const query = `
    SELECT 
      DATE(timestamp) as date,
      SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) as total_income,
      SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) as total_expense
    FROM (
      SELECT timestamp, amount, 'income' as type
      FROM incomes
      WHERE user_id = ? ${dateFilter}
      UNION ALL
      SELECT timestamp, amount, 'expense' as type
      FROM expenses
      WHERE user_id = ? ${dateFilter}
    ) combined
    GROUP BY DATE(timestamp)
    ORDER BY date ASC
  `;

  try {
    const [results] = await db.execute(query, [user_id, user_id]);
    res.json({ success: true, data: results });
  } catch (err) {
    console.error("Error fetching daily contributions:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
