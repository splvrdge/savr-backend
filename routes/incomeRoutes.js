const express = require("express");
const router = express.Router();
const incomeController = require("../controllers/incomeController");

router.post("/add", incomeController.addIncome);
router.get("/:user_id", incomeController.getIncomes);
router.put("/update", incomeController.updateIncome);
router.delete("/delete/:income_id", incomeController.deleteIncome);

module.exports = router;
