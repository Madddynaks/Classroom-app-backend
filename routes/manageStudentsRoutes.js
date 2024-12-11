const express = require("express");
const { addCR } = require("../controllers/manageStudentsController");
const authenticateUser = require("../middleware/authenticateUser");
const router = express.Router();

// Route to add CR
router.post("/addCR", authenticateUser, addCR);

module.exports = router;
