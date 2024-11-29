const express = require("express");
const {
	assignSubjectsToTeacher,
	getUnassignedSubjects,
	getSubjectsByTeacher,
	deleteTeacherSubjectRelation,
} = require("../controllers/teacherSubjectContoller");
const authenticateUser = require("../middleware/authenticateUser");
const router = express.Router();

// Route to assign subjects to a teacher
router.post("/assignSubjects", authenticateUser, assignSubjectsToTeacher);
router.get("/unassignedSubjects", authenticateUser, getUnassignedSubjects);
router.post("/getSubjectsByTeacher", authenticateUser, getSubjectsByTeacher);
router.delete("/deleteTeacherSubject", authenticateUser, deleteTeacherSubjectRelation);

module.exports = router;
