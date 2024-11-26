const express = require("express");
const { addCR } = require("../controllers/manageStudentsController");
const router = express.Router();

// Route to add CR
router.post("/addCR", addCR);

module.exports = router;
