const express = require('express');
const { registerStudent, registerTeacher } = require('../controllers/emailController');
const router = express.Router();

router.post('/registerStudent', registerStudent); 
router.post('/registerTeacher', registerTeacher);

module.exports = router;
