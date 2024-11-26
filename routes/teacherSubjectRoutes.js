const express = require("express");
const { assignSubjectsToTeacher, getUnassignedSubjects, getSubjectsByTeacher, deleteTeacherSubjectRelation } = require("../controllers/teacherSubjectContoller");
const router = express.Router();

// Route to assign subjects to a teacher
router.post("/assignSubjects", assignSubjectsToTeacher);
router.get("/unassignedSubjects", getUnassignedSubjects);
router.post("/getSubjectsByTeacher", getSubjectsByTeacher);
router.delete("/deleteTeacherSubject", deleteTeacherSubjectRelation);

module.exports = router;
