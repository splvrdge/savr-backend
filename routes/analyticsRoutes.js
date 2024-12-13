const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');
const { authenticateToken } = require('../middleware/auth');

router.get('/expenses/:user_id', authenticateToken, analyticsController.getExpensesByCategory);
router.get('/income/:user_id', authenticateToken, analyticsController.getIncomeByCategory);
router.get('/trends/:user_id', authenticateToken, analyticsController.getMonthlyTrends);
router.get('/daily/:user_id', authenticateToken, analyticsController.getDailyContributions);

module.exports = router;
