const express = require('express');
const { processExcelAndSendEmails } = require('../controllers/emailController');
const router = express.Router();

// Define the route to process the excel file
router.post('/', processExcelAndSendEmails); // Use '/' as the relative path for POST

module.exports = router;
