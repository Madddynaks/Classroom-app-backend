const express = require("express");
const { addFeedback, getSubjectsByStudent } = require("../controllers/feedbackController");
const authenticateUser = require("../middleware/authenticateUser");

const router = express.Router();

// POST: Add feedback
router.post("/add-feedback", authenticateUser, addFeedback);
router.post("/get-subjects", authenticateUser, getSubjectsByStudent);

module.exports = router;
