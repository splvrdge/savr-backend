const express = require("express");
const searchController = require("../controllers/searchController");

const router = express.Router();

router.get("/sample-terms", searchController.searchSampleTerms);
router.get("/skeletal-system", searchController.searchSkeletalSystemTerms);

module.exports = router;
