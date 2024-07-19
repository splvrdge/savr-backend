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

module.exports = router;
