const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');
const { verifyToken } = require('../middleware/auth');

router.get('/expenses/:user_id', verifyToken, analyticsController.getExpensesByCategory);
router.get('/income/:user_id', verifyToken, analyticsController.getIncomeByCategory);
router.get('/trends/:user_id', verifyToken, analyticsController.getMonthlyTrends);

module.exports = router;
