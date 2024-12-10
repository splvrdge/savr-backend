const express = require("express");
const router = express.Router();
const incomeController = require("../controllers/incomeController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/add", authMiddleware.verifyToken, incomeController.addIncome);
router.get(
  "/:user_id",
  authMiddleware.verifyToken,
  incomeController.getIncomes
);
router.put(
  "/update",
  authMiddleware.verifyToken,
  incomeController.updateIncome
);
router.delete(
  "/delete/:income_id",
  authMiddleware.verifyToken,
  incomeController.deleteIncome
);

module.exports = router;
