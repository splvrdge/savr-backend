const db = require("../config/db");

exports.getExpensesByCategory = async (req, res) => {
  const { user_id } = req.params;
  const { timeframe } = req.query;

  try {
    let dateFilter = '';
    switch (timeframe) {
      case 'week':
        dateFilter = 'AND e.timestamp >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)';
        break;
      case 'month':
        dateFilter = 'AND e.timestamp >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)';
        break;
      case 'year':
        dateFilter = 'AND e.timestamp >= DATE_SUB(CURDATE(), INTERVAL 1 YEAR)';
        break;
      default:
        dateFilter = 'AND e.timestamp >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)';
    }

    const query = `
      SELECT 
        e.category,
        SUM(e.amount) as total_amount,
        COUNT(*) as transaction_count,
        ROUND((SUM(e.amount) / NULLIF((
          SELECT SUM(amount)
          FROM expenses 
          WHERE user_id = ? ${dateFilter.replace('e.', '')}
        ), 0)) * 100, 2) as percentage
      FROM expenses e
      WHERE e.user_id = ? ${dateFilter}
      GROUP BY e.category
      ORDER BY total_amount DESC
    `;

    console.log('Expense Analytics Query:', query);
    console.log('User ID:', user_id);

    const [results] = await db.execute(query, [user_id, user_id]);
    
    const formattedData = results.map(item => ({
      ...item,
      total_amount: parseFloat(item.total_amount) || 0,
      percentage: parseFloat(item.percentage) || 0
    }));

    const total = formattedData.reduce((sum, item) => sum + item.total_amount, 0);

    res.json({ 
      success: true, 
      data: formattedData,
      total
    });
  } catch (err) {
    console.error("Error fetching expense analytics:", err);
    res.status(500).json({ 
      success: false, 
      message: "Failed to fetch expense analytics",
      error: err.message
    });
  }
};

exports.getIncomeByCategory = async (req, res) => {
  const { user_id } = req.params;
  const { timeframe } = req.query;

  try {
    let dateFilter = '';
    switch (timeframe) {
      case 'week':
        dateFilter = 'AND i.timestamp >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)';
        break;
      case 'month':
        dateFilter = 'AND i.timestamp >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)';
        break;
      case 'year':
        dateFilter = 'AND i.timestamp >= DATE_SUB(CURDATE(), INTERVAL 1 YEAR)';
        break;
      default:
        dateFilter = 'AND i.timestamp >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)';
    }

    const query = `
      SELECT 
        i.category,
        SUM(i.amount) as total_amount,
        COUNT(*) as transaction_count,
        ROUND((SUM(i.amount) / NULLIF((
          SELECT SUM(amount)
          FROM incomes 
          WHERE user_id = ? ${dateFilter.replace('i.', '')}
        ), 0)) * 100, 2) as percentage
      FROM incomes i
      WHERE i.user_id = ? ${dateFilter}
      GROUP BY i.category
      ORDER BY total_amount DESC
    `;

    console.log('Income Analytics Query:', query);
    console.log('User ID:', user_id);

    const [results] = await db.execute(query, [user_id, user_id]);
    
    const formattedData = results.map(item => ({
      ...item,
      total_amount: parseFloat(item.total_amount) || 0,
      percentage: parseFloat(item.percentage) || 0
    }));

    const total = formattedData.reduce((sum, item) => sum + item.total_amount, 0);

    res.json({ 
      success: true, 
      data: formattedData,
      total
    });
  } catch (err) {
    console.error("Error fetching income analytics:", err);
    res.status(500).json({ 
      success: false, 
      message: "Failed to fetch income analytics",
      error: err.message
    });
  }
};

exports.getMonthlyTrends = async (req, res) => {
  const { user_id } = req.params;
  
  try {
    const query = `
      SELECT 
        DATE_FORMAT(date, '%Y-%m') as month,
        SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) as income,
        SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) as expense
      FROM (
        SELECT timestamp as date, amount, 'income' as type
        FROM incomes
        WHERE user_id = ? AND timestamp >= DATE_SUB(CURDATE(), INTERVAL 12 MONTH)
        UNION ALL
        SELECT timestamp as date, amount, 'expense' as type
        FROM expenses
        WHERE user_id = ? AND timestamp >= DATE_SUB(CURDATE(), INTERVAL 12 MONTH)
      ) combined
      GROUP BY DATE_FORMAT(date, '%Y-%m')
      ORDER BY month ASC
    `;

    console.log('Monthly Trends Query:', query);
    console.log('User ID:', user_id);

    const [results] = await db.execute(query, [user_id, user_id]);
    res.json({ success: true, data: results });
  } catch (err) {
    console.error("Error fetching monthly trends:", err);
    res.status(500).json({ 
      success: false, 
      message: "Failed to fetch monthly trends",
      error: err.message
    });
  }
};

exports.getDailyContributions = async (req, res) => {
  const { user_id } = req.params;
  const { timeframe = 'month' } = req.query;

  try {
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
      WITH RECURSIVE dates AS (
        SELECT CURDATE() - INTERVAL 
          CASE 
            WHEN ? = 'week' THEN 7
            WHEN ? = 'month' THEN 30
            ELSE 365
          END DAY as date
        UNION ALL
        SELECT date + INTERVAL 1 DAY
        FROM dates
        WHERE date < CURDATE()
      )
      SELECT 
        dates.date,
        COALESCE(SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END), 0) as total_income,
        COALESCE(SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END), 0) as total_expense
      FROM dates
      LEFT JOIN (
        SELECT DATE(timestamp) as trans_date, amount, 'income' as type
        FROM incomes
        WHERE user_id = ? ${dateFilter}
        UNION ALL
        SELECT DATE(timestamp) as trans_date, amount, 'expense' as type
        FROM expenses
        WHERE user_id = ? ${dateFilter}
      ) transactions ON dates.date = transactions.trans_date
      GROUP BY dates.date
      ORDER BY dates.date ASC
    `;

    console.log('Daily Activity Query:', query);
    console.log('User ID:', user_id);
    console.log('Timeframe:', timeframe);

    const [results] = await db.execute(query, [timeframe, timeframe, user_id, user_id]);
    
    const formattedResults = results.map(row => ({
      ...row,
      date: row.date.toISOString().split('T')[0],
      total_income: parseFloat(row.total_income) || 0,
      total_expense: parseFloat(row.total_expense) || 0
    }));

    res.json({ 
      success: true, 
      data: formattedResults
    });
  } catch (err) {
    console.error("Error fetching daily activity:", err);
    res.status(500).json({ 
      success: false, 
      message: "Failed to fetch daily activity",
      error: err.message
    });
  }
};
