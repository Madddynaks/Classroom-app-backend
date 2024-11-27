const express = require("express");
const { addNoteTeacher, addNoteByStudent, deleteNote, viewNotesByTeacher, viewNotesByStudent } = require("../controllers/notesController");

const router = express.Router();

// Route to add notes
router.post("/add-note-teacher", addNoteTeacher);
router.post("/add-note-student", addNoteByStudent);
router.delete("/delete-note", deleteNote);
router.post("/view-notes-teacher", viewNotesByTeacher);
router.post("/view-notes-student", viewNotesByStudent);


module.exports = router;
