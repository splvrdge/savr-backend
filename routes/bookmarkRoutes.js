const express = require("express");
const bookmarkController = require("../controllers/bookmarkController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Sample Term Bookmarks
router.post(
  "/sample-terms/add",
  authMiddleware.verifyToken,
  bookmarkController.addSampleTermBookmark
);
router.post(
  "/sample-terms/remove",
  authMiddleware.verifyToken,
  bookmarkController.removeSampleTermBookmark
);
router.get(
  "/sample-terms",
  authMiddleware.verifyToken,
  bookmarkController.getSampleTermBookmarks
);
router.get(
  "/sample-terms/:term_id",
  authMiddleware.verifyToken,
  bookmarkController.isSampleTermBookmarked
);

// Skeletal System Bookmarks
router.post(
  "/skeletal-system/add",
  authMiddleware.verifyToken,
  bookmarkController.addSkeletalSystemBookmark
);
router.post(
  "/skeletal-system/remove",
  authMiddleware.verifyToken,
  bookmarkController.removeSkeletalSystemBookmark
);
router.get(
  "/skeletal-system",
  authMiddleware.verifyToken,
  bookmarkController.getSkeletalSystemBookmarks
);
router.get(
  "/skeletal-system/:term_id",
  authMiddleware.verifyToken,
  bookmarkController.isSkeletalSystemBookmarked
);

// Cardiovascular System Bookmarks
router.post(
  "/cardiovascular-system/add",
  authMiddleware.verifyToken,
  bookmarkController.addCardiovascularSystemBookmark
);
router.post(
  "/cardiovascular-system/remove",
  authMiddleware.verifyToken,
  bookmarkController.removeCardiovascularSystemBookmark
);
router.get(
  "/cardiovascular-system",
  authMiddleware.verifyToken,
  bookmarkController.getCardiovascularSystemBookmarks
);
router.get(
  "/cardiovascular-system/:term_id",
  authMiddleware.verifyToken,
  bookmarkController.isCardiovascularSystemBookmarked
);

// Integumentary System Bookmarks
router.post(
  "/integumentary-system/add",
  authMiddleware.verifyToken,
  bookmarkController.addIntegumentarySystemBookmark
);
router.post(
  "/integumentary-system/remove",
  authMiddleware.verifyToken,
  bookmarkController.removeIntegumentarySystemBookmark
);
router.get(
  "/integumentary-system",
  authMiddleware.verifyToken,
  bookmarkController.getIntegumentarySystemBookmarks
);
router.get(
  "/integumentary-system/:term_id",
  authMiddleware.verifyToken,
  bookmarkController.isIntegumentarySystemBookmarked
);

// Nervous System Bookmarks
router.post(
  "/nervous-system/add",
  authMiddleware.verifyToken,
  bookmarkController.addNervousSystemBookmark
);
router.post(
  "/nervous-system/remove",
  authMiddleware.verifyToken,
  bookmarkController.removeNervousSystemBookmark
);
router.get(
  "/nervous-system",
  authMiddleware.verifyToken,
  bookmarkController.getNervousSystemBookmarks
);
router.get(
  "/nervous-system/:term_id",
  authMiddleware.verifyToken,
  bookmarkController.isNervousSystemBookmarked
);

// Reproductive System Bookmarks
router.post(
  "/reproductive-system/add",
  authMiddleware.verifyToken,
  bookmarkController.addReproductiveSystemBookmark
);
router.post(
  "/reproductive-system/remove",
  authMiddleware.verifyToken,
  bookmarkController.removeReproductiveSystemBookmark
);
router.get(
  "/reproductive-system",
  authMiddleware.verifyToken,
  bookmarkController.getReproductiveSystemBookmarks
);
router.get(
  "/reproductive-system/:term_id",
  authMiddleware.verifyToken,
  bookmarkController.isReproductiveSystemBookmarked
);

// Respiratory System Bookmarks
router.post(
  "/respiratory-system/add",
  authMiddleware.verifyToken,
  bookmarkController.addRespiratorySystemBookmark
);
router.post(
  "/respiratory-system/remove",
  authMiddleware.verifyToken,
  bookmarkController.removeRespiratorySystemBookmark
);
router.get(
  "/respiratory-system",
  authMiddleware.verifyToken,
  bookmarkController.getRespiratorySystemBookmarks
);
router.get(
  "/respiratory-system/:term_id",
  authMiddleware.verifyToken,
  bookmarkController.isRespiratorySystemBookmarked
);

// Urinary System Bookmarks
router.post(
  "/urinary-system/add",
  authMiddleware.verifyToken,
  bookmarkController.addUrinarySystemBookmark
);
router.post(
  "/urinary-system/remove",
  authMiddleware.verifyToken,
  bookmarkController.removeUrinarySystemBookmark
);
router.get(
  "/urinary-system",
  authMiddleware.verifyToken,
  bookmarkController.getUrinarySystemBookmarks
);
router.get(
  "/urinary-system/:term_id",
  authMiddleware.verifyToken,
  bookmarkController.isUrinarySystemBookmarked
);

module.exports = router;
