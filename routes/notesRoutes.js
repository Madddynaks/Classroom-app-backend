const express = require("express");
const {
	addNoteTeacher,
	addNoteByStudent,
	deleteNote,
	viewNotesByTeacher,
	viewNotesByStudent,
} = require("../controllers/notesController");
const authenticateUser = require("../middleware/authenticateUser");

const router = express.Router();

// Route to add notes
router.post("/add-note-teacher", authenticateUser, addNoteTeacher);
router.post("/add-note-student", authenticateUser, addNoteByStudent);
router.delete("/delete-note", authenticateUser, deleteNote);
router.post("/view-notes-teacher", authenticateUser, viewNotesByTeacher);
router.post("/view-notes-student", authenticateUser, viewNotesByStudent);

module.exports = router;
