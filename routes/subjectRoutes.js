const express = require("express");
const { fetchAllSubjects } = require("../controllers/subjectController");
const authenticateUser = require("../middleware/authenticateUser");

const router = express.Router();


router.get("/fetchAllSubjects",  fetchAllSubjects);


module.exports = router;
