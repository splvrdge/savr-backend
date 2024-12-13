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

    params = [...params, ...params];
    const [results] = await db.execute(query, params);
    
    const formattedData = results.map(item => ({
      category: item.category || 'Uncategorized',
      total_amount: parseFloat(item.total_amount) || 0,
      transaction_count: parseInt(item.transaction_count) || 0,
      percentage: parseFloat(item.percentage) || 0
    }));

    res.json({
      success: true,
      data: formattedData
    });
  } catch (error) {
    console.error('Error fetching expense analytics:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch expense analytics'
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
          FROM incomes 
          WHERE user_id = ? ${dateFilter.replace('i.', '')}
        ), 0)) * 100, 2) as percentage
      FROM incomes i
      WHERE i.user_id = ? ${dateFilter}
      GROUP BY i.category
      ORDER BY total_amount DESC
    `;

    params = [...params, ...params];
    const [results] = await db.execute(query, params);
    
    const formattedData = results.map(item => ({
      category: item.category || 'Uncategorized',
      total_amount: parseFloat(item.total_amount) || 0,
      transaction_count: parseInt(item.transaction_count) || 0,
      percentage: parseFloat(item.percentage) || 0
    }));

    res.json({
      success: true,
      data: formattedData
    });
  } catch (error) {
    console.error('Error fetching income analytics:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch income analytics'
    });
  }
};

exports.getMonthlyTrends = async (req, res) => {
  const { user_id } = req.params;
  const { year } = req.query;

  try {
    const currentYear = year || new Date().getFullYear();
    
    const query = `
      SELECT 
        DATE_FORMAT(timestamp, '%Y-%m') as month,
        SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) as total_income,
        SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) as total_expenses,
        COUNT(DISTINCT CASE WHEN type = 'income' THEN id END) as income_count,
        COUNT(DISTINCT CASE WHEN type = 'expense' THEN id END) as expense_count
      FROM user_financial_data
      WHERE user_id = ? 
      AND YEAR(timestamp) = ?
      GROUP BY DATE_FORMAT(timestamp, '%Y-%m')
      ORDER BY month ASC
    `;

    const [results] = await db.execute(query, [user_id, currentYear]);
    
    const formattedData = results.map(item => ({
      month: item.month,
      total_income: parseFloat(item.total_income) || 0,
      total_expenses: parseFloat(item.total_expenses) || 0,
      income_count: parseInt(item.income_count) || 0,
      expense_count: parseInt(item.expense_count) || 0,
      net: parseFloat(item.total_income - item.total_expenses) || 0
    }));

    res.json({
      success: true,
      data: formattedData
    });
  } catch (error) {
    console.error('Error fetching monthly trends:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch monthly trends'
    });
  }
};
