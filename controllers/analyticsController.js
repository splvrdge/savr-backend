const db = require("../config/db");

exports.getExpensesByCategory = async (req, res) => {
  const { user_id } = req.params;
  const { timeframe, date, year } = req.query;

  try {
    let dateFilter = '';
    let params = [user_id];

    if (timeframe === 'week' && date) {
      dateFilter = `AND DATE(e.timestamp) = DATE(?)`;
      params.push(date);
    } else if (timeframe === 'month' && date) {
      dateFilter = `AND DATE_FORMAT(e.timestamp, '%Y-%m') = ?`;
      params.push(date);
    } else if (timeframe === 'year' && year) {
      dateFilter = `AND YEAR(e.timestamp) = ?`;
      params.push(year);
    } else {
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

    // Add the parameters for the subquery and main query
    params = [...params, ...params];

    const [results] = await db.execute(query, params);
    
    const formattedData = results.map(item => ({
      ...item,
      total_amount: parseFloat(item.total_amount) || 0,
      percentage: parseFloat(item.percentage) || 0
    }));

    res.json({
      success: true,
      data: formattedData
    });
  } catch (error) {
    console.error('Error in getExpensesByCategory:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch expense analytics',
      error: error.message
    });
  }
};

exports.getIncomeByCategory = async (req, res) => {
  const { user_id } = req.params;
  const { timeframe, date, year } = req.query;

  try {
    let dateFilter = '';
    let params = [user_id];

    if (timeframe === 'week' && date) {
      dateFilter = `AND DATE(i.timestamp) = DATE(?)`;
      params.push(date);
    } else if (timeframe === 'month' && date) {
      dateFilter = `AND DATE_FORMAT(i.timestamp, '%Y-%m') = ?`;
      params.push(date);
    } else if (timeframe === 'year' && year) {
      dateFilter = `AND YEAR(i.timestamp) = ?`;
      params.push(year);
    } else {
      dateFilter = 'AND i.timestamp >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)';
    }

    const query = `
      SELECT 
        i.category,
        SUM(i.amount) as total_amount,
        COUNT(*) as transaction_count,
        ROUND((SUM(i.amount) / NULLIF((
          SELECT SUM(amount)
          FROM income 
          WHERE user_id = ? ${dateFilter.replace('i.', '')}
        ), 0)) * 100, 2) as percentage
      FROM income i
      WHERE i.user_id = ? ${dateFilter}
      GROUP BY i.category
      ORDER BY total_amount DESC
    `;

    // Add the parameters for the subquery and main query
    params = [...params, ...params];

    const [results] = await db.execute(query, params);
    
    const formattedData = results.map(item => ({
      ...item,
      total_amount: parseFloat(item.total_amount) || 0,
      percentage: parseFloat(item.percentage) || 0
    }));

    res.json({
      success: true,
      data: formattedData
    });
  } catch (error) {
    console.error('Error in getIncomeByCategory:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch income analytics',
      error: error.message
    });
  }
};

exports.getMonthlyTrends = async (req, res) => {
  const { user_id } = req.params;
  const { timeframe } = req.query;

  try {
    let monthLimit;
    switch (timeframe) {
      case 'week':
        monthLimit = 1;
        break;
      case 'month':
        monthLimit = 3;
        break;
      case 'year':
        monthLimit = 12;
        break;
      default:
        monthLimit = 3;
    }

    const query = `
      SELECT 
        DATE_FORMAT(date, '%b') as month,
        COALESCE(SUM(income), 0) as income,
        COALESCE(SUM(expense), 0) as expense
      FROM (
        SELECT 
          DATE(timestamp) as date,
          SUM(amount) as income,
          0 as expense
        FROM income
        WHERE user_id = ? 
        AND timestamp >= DATE_SUB(CURDATE(), INTERVAL ? MONTH)
        GROUP BY DATE(timestamp)
        UNION ALL
        SELECT 
          DATE(timestamp) as date,
          0 as income,
          SUM(amount) as expense
        FROM expenses
        WHERE user_id = ?
        AND timestamp >= DATE_SUB(CURDATE(), INTERVAL ? MONTH)
        GROUP BY DATE(timestamp)
      ) combined
      GROUP BY month
      ORDER BY MIN(date)
    `;

    const [results] = await db.execute(query, [user_id, monthLimit, user_id, monthLimit]);
    
    const formattedData = results.map(item => ({
      ...item,
      income: parseFloat(item.income) || 0,
      expense: parseFloat(item.expense) || 0
    }));

    res.json({
      success: true,
      data: formattedData
    });
  } catch (error) {
    console.error('Error in getMonthlyTrends:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch monthly trends',
      error: error.message
    });
  }
};
