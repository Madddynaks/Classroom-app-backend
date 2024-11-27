const express = require("express");
const { addFeedback , getSubjectsByStudent } = require("../controllers/feedbackController");

const router = express.Router();

// POST: Add feedback
router.post("/add-feedback", addFeedback);
router.post("/get-subjects", getSubjectsByStudent);

module.exports = router;
