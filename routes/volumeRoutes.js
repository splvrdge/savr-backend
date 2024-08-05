const express = require("express");
const volumeController = require("../controllers/volumeController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/volumes", volumeController.getVolumes);

router.get("/sample-terms", volumeController.getSampleTerms);
router.get("/sample-terms/:id", volumeController.getSampleTermDetails);

router.get("/skeletal-terms", volumeController.getSkeletalTerms);
router.get(
  "/skeletal-system/:id",
  authMiddleware.verifyToken,
  volumeController.getSkeletalTermDetails
);

// Cardiovascular System
router.get("/cardiovascular-terms", volumeController.getCardiovascularTerms);
router.get(
  "/cardiovascular-system/:id",
  authMiddleware.verifyToken,
  volumeController.getCardiovascularTermDetails
);

// Integumentary System
router.get("/integumentary-terms", volumeController.getIntegumentaryTerms);
router.get(
  "/integumentary-system/:id",
  authMiddleware.verifyToken,
  volumeController.getIntegumentaryTermDetails
);

// Nervous System
router.get("/nervous-terms", volumeController.getNervousTerms);
router.get(
  "/nervous-system/:id",
  authMiddleware.verifyToken,
  volumeController.getNervousTermDetails
);

// Reproductive System
router.get("/reproductive-terms", volumeController.getReproductiveTerms);
router.get(
  "/reproductive-system/:id",
  authMiddleware.verifyToken,
  volumeController.getReproductiveTermDetails
);

// Respiratory System
router.get("/respiratory-terms", volumeController.getRespiratoryTerms);
router.get(
  "/respiratory-system/:id",
  authMiddleware.verifyToken,
  volumeController.getRespiratoryTermDetails
);

// Urinary System
router.get("/urinary-terms", volumeController.getUrinaryTerms);
router.get(
  "/urinary-system/:id",
  authMiddleware.verifyToken,
  volumeController.getUrinaryTermDetails
);

// Latin Muscle Names in English
router.get(
  "/latin-muscle-names-in-english",
  volumeController.getMuscleEnglishTerms
);
router.get(
  "/latin-muscle-names-in-english/:id",
  authMiddleware.verifyToken,
  volumeController.getMuscleEnglishTermDetails
);

// Digestive System
router.get("/digestive-terms", volumeController.getDigestiveTerms);
router.get(
  "/digestive-system/:id",
  authMiddleware.verifyToken,
  volumeController.getDigestiveTermDetails
);

// Immune System
router.get("/immune-terms", volumeController.getImmuneTerms);
router.get(
  "/immune-system/:id",
  authMiddleware.verifyToken,
  volumeController.getImmuneTermDetails
);

// Joint System
router.get("/joint-and-directional-terms", volumeController.getJointTerms);
router.get(
  "/joint-and-directional-terms/:id",
  authMiddleware.verifyToken,
  volumeController.getJointTermDetails
);

// Muscular System
router.get("/muscular-system-physiology", volumeController.getMuscularTerms);
router.get(
  "/muscular-system-physiology/:id",
  authMiddleware.verifyToken,
  volumeController.getMuscularTermDetails
);

// Plane System
router.get("/plane-and-directional-terms", volumeController.getPlaneTerms);
router.get(
  "/plane-and-directional-terms/:id",
  authMiddleware.verifyToken,
  volumeController.getPlaneTermDetails
);

module.exports = router;
