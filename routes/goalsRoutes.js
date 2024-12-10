const express = require("express");
const router = express.Router();
const goalController = require("../controllers/goalsController");

router.post("/add", goalController.addGoal);
router.get("/:user_id", goalController.getGoals);
router.put("/update", goalController.updateGoal);
router.delete("/delete/:goal_id", goalController.deleteGoal);

module.exports = router;
