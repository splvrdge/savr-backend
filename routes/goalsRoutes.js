const express = require("express");
const router = express.Router();
const goalController = require("../controllers/goalsController");
const authMiddleware = require("../middlewares/authMiddleware");

// Goal routes
router.post("/add", authMiddleware.verifyToken, goalController.addGoal);
router.get("/:user_id", authMiddleware.verifyToken, goalController.getGoals);
router.put("/update/:goal_id", authMiddleware.verifyToken, goalController.updateGoal);
router.delete("/delete/:goal_id", authMiddleware.verifyToken, goalController.deleteGoal);

// Contribution routes
router.post("/contribution/add", authMiddleware.verifyToken, goalController.addContribution);
router.get("/contributions/:goal_id", authMiddleware.verifyToken, goalController.getContributions);
router.delete("/contribution/:contribution_id", authMiddleware.verifyToken, goalController.deleteContribution);

module.exports = router;
