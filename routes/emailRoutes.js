const express = require('express');
const { registerStudent, registerTeacher, addSubjectsExcel } = require('../controllers/emailController');
const router = express.Router();

router.post('/registerStudent', registerStudent); 
router.post('/addSubjectsExcel', addSubjectsExcel); 
router.post('/registerTeacher', registerTeacher);

module.exports = router;
