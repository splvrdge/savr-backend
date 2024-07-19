const express = require("express");
const volumeController = require("../controllers/volumeController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/volumes", volumeController.getVolumes);
router.get("/skeletal-terms", volumeController.getSkeletalTerms);
router.get("/sample-terms", volumeController.getSampleTerms);
router.get("/sample-terms/:id", volumeController.getSampleTermDetails);
router.get("/skeletal-system/:id", volumeController.getSkeletalTermDetails);

module.exports = router;
