const { body, param, validationResult } = require('express-validator');

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  next();
};

const incomeValidationRules = [
  body('amount').isFloat({ min: 0 }).withMessage('Amount must be a positive number'),
  body('category').isString().notEmpty().withMessage('Category is required'),
  body('description').optional().isString(),
  body('date').isISO8601().withMessage('Invalid date format'),
];

const expenseValidationRules = [
  body('amount').isFloat({ min: 0 }).withMessage('Amount must be a positive number'),
  body('category').isString().notEmpty().withMessage('Category is required'),
  body('description').optional().isString(),
  body('date').isISO8601().withMessage('Invalid date format'),
];

const goalValidationRules = [
  body('title').isString().notEmpty().withMessage('Title is required'),
  body('target_amount').isFloat({ min: 0 }).withMessage('Target amount must be a positive number'),
  body('current_amount').isFloat({ min: 0 }).withMessage('Current amount must be a positive number'),
  body('deadline').isISO8601().withMessage('Invalid date format'),
];

const userIdValidation = [
  param('user_id').isInt().withMessage('Invalid user ID'),
];

module.exports = {
  handleValidationErrors,
  incomeValidationRules,
  expenseValidationRules,
  goalValidationRules,
  userIdValidation
};
