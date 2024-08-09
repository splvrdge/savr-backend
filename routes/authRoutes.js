const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

router.post("/login", authController.login);
router.post("/signup", authController.signup);
router.post("/checkEmail", authController.checkEmail);
router.post("/changePassword", authController.changePassword);

module.exports = router;
