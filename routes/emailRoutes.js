const express = require('express');
const { processExcelAndSendEmailsStudents, processExcelAndSendEmailsTeachers } = require('../controllers/emailController');
const router = express.Router();

router.post('/registerStudent', processExcelAndSendEmailsStudents); 
router.post('/registerTeacher', processExcelAndSendEmailsTeachers);

module.exports = router;
