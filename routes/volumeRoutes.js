const express = require("express");
const volumeController = require("../controllers/volumeController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/volumes", volumeController.getVolumes);

router.get("/sample-terms", volumeController.getSampleTerms);
router.get("/sample-terms/:id", volumeController.getSampleTermDetails);

router.get("/skeletal-terms", volumeController.getSkeletalTerms);
router.get("/skeletal-system/:id", volumeController.getSkeletalTermDetails);

// Cardiovascular System
router.get("/cardiovascular-terms", volumeController.getCardiovascularTerms);
router.get(
  "/cardiovascular-system/:id",
  volumeController.getCardiovascularTermDetails
);

// Integumentary System
router.get("/integumentary-terms", volumeController.getIntegumentaryTerms);
router.get(
  "/integumentary-system/:id",
  volumeController.getIntegumentaryTermDetails
);

// Nervous System
router.get("/nervous-terms", volumeController.getNervousTerms);
router.get("/nervous-system/:id", volumeController.getNervousTermDetails);

// Reproductive System
router.get("/reproductive-terms", volumeController.getReproductiveTerms);
router.get(
  "/reproductive-system/:id",
  volumeController.getReproductiveTermDetails
);

// Respiratory System
router.get("/respiratory-terms", volumeController.getRespiratoryTerms);
router.get(
  "/respiratory-system/:id",
  volumeController.getRespiratoryTermDetails
);

// Urinary System
router.get("/urinary-terms", volumeController.getUrinaryTerms);
router.get("/urinary-system/:id", volumeController.getUrinaryTermDetails);

module.exports = router;
