const express = require("express");
const router = express.Router();
const incomeController = require("../controllers/incomeController");
const { authenticateToken } = require("../middlewares/authMiddleware");

router.post("/add", authenticateToken, incomeController.addIncome);
router.get(
  "/:user_id",
  authenticateToken,
  incomeController.getIncomes
);
router.put(
  "/update",
  authenticateToken,
  incomeController.updateIncome
);
router.delete(
  "/delete/:income_id",
  authenticateToken,
  incomeController.deleteIncome
);

router.get("/categories", (req, res) => {
  const categories = ["Business", "Investments", "Salary", "Other Income"];
  res.json({ success: true, data: categories });
});

module.exports = router;
