const express = require("express")
const router = express.Router()


const {
  submitTrailTestTime,
  getTrailTestHistory
} = require("../controllers/Profile");

// POST /api/v1/trail-test/submit
router.post("/submit", submitTrailTestTime);

// GET /api/v1/trail-test/history/:userId
router.get("/history/:userId", getTrailTestHistory);


module.exports = router