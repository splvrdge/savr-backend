const express = require("express");
const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.put(
  "/profile",
  authMiddleware.verifyToken,
  userController.updateProfile
);
router.get(
  "/secured-info",
  authMiddleware.verifyToken,
  userController.getSecuredInfo
);

module.exports = router;
