const express = require("express");
const router = express.Router();
const expenseController = require("../controllers/expenseController");

router.post("/add", expenseController.addExpense);
router.get("/:user_id", expenseController.getExpenses);
router.put("/update", expenseController.updateExpense);
router.delete("/delete/:expense_id", expenseController.deleteExpense);

module.exports = router;
