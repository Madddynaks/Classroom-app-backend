const express = require("express");
const {
	registerStudent,
	registerTeacher,
	addSubjectsExcel,
} = require("../controllers/emailController");
const authenticateUser = require("../middleware/authenticateUser");
const router = express.Router();

router.post("/registerStudent", authenticateUser, registerStudent);
router.post("/addSubjectsExcel", authenticateUser, addSubjectsExcel);
router.post("/registerTeacher", authenticateUser, registerTeacher);

module.exports = router;
