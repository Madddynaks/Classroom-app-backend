const mongoose = require("mongoose"); // Add this line if missing
const Notes = require("../models/Notes");
const TeacherSubject = require("../models/Teacher-Subject");
const Users = require("../models/Users");
const Students = require("../models/Students");
const CR = require("../models/CR");
const Subjects = require("../models/Subjects");

// Controller to add notes
const addNoteTeacher = async (req, res) => {
  const { teacherId, subjectId, noteText } = req.body;

  try {
    // Step 1: Verify if the user is a teacher
    const user = await Users.findOne({ id: teacherId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role.toLowerCase() !== "teacher") {
      return res.status(403).json({ message: "Only teachers can add notes" });
    }

    // Step 2: Check teacher-subject relationship
    const relationship = await TeacherSubject.findOne({
      TeacherId: teacherId,
      SubjectId: subjectId,
    });

    if (!relationship) {
      return res.status(403).json({
        message: "Teacher is not assigned to this subject",
      });
    }

    // Step 3: Add the note
    const newNote = new Notes({
      userID: teacherId,
      subjectID: subjectId,
      note: noteText,
    });

    await newNote.save();

    res.status(201).json({
      message: "Note added successfully",
      note: newNote,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const addNoteByStudent = async (req, res) => {
  const { userId, subjectId, noteText } = req.body;

  try {
    // Step 1: Verify if the user is a student
    const user = await Users.findOne({ id: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role.toLowerCase() !== "student") {
      return res.status(403).json({ message: "Only students can add notes" });
    }

    // Step 2: Fetch semester and branch from the student table
    const student = await Students.findOne({ id: userId });
    if (!student) {
      return res.status(404).json({ message: "Student details not found" });
    }

    const { semester, branch } = student;

    // Step 3: Check if the student is in the CR table
    const isCR = await CR.findOne({ id: userId });
    if (!isCR) {
      return res.status(403).json({ message: "Only CRs can add notes" });
    }

    // Step 4: Verify if the subject exists for the given semester and branch
    const subject = await Subjects.findOne({
      SubjectId: subjectId,
      semester: semester,
      branch: branch,
    });

    if (!subject) {
      return res.status(404).json({
        message: "Subject not found for the student's semester and branch",
      });
    }

    // Step 5: Add the note
    const newNote = new Notes({
      userID: userId,
      subjectID: subjectId,
      note: noteText,
    });

    await newNote.save();

    res.status(201).json({
      message: "Note added successfully",
      note: newNote,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const deleteNote = async (req, res) => {
    const { userId, _id } = req.body;
  
    try {
      // Step 1: Verify the user's role
      const user = await Users.findOne({ id: userId });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      if (user.role.toLowerCase() !== "teacher") {
        return res.status(403).json({ message: "Only teachers can delete notes" });
      }
  
      // Step 2: Find the subject ID from the note's _id
      const note = await Notes.findById(_id);
      if (!note) {
        return res.status(404).json({ message: "Note not found" });
      }
      const { subjectID } = note;
  
      // Step 3: Check if the teacher is assigned to this subject
      const relationship = await TeacherSubject.findOne({
        TeacherId: userId,
        SubjectId: subjectID,
      });
  
      if (!relationship) {
        return res.status(403).json({
          message: "Teacher is not assigned to this subject, deletion not allowed",
        });
      }
  
      // Step 4: Delete the note
      await Notes.findByIdAndDelete(_id);
  
      res.status(200).json({
        message: "Note deleted successfully",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };

  const viewNotesByTeacher = async (req, res) => {
    const { userId } = req.body;
  
    try {
      // Step 1: Verify if the user is a teacher
      const user = await Users.findOne({ id: userId });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      if (user.role.toLowerCase() !== "teacher") {
        return res.status(403).json({ message: "invalid api-role relation" });
      }
  
      // Step 2: Get all subject IDs associated with the teacher
      const teacherSubjects = await TeacherSubject.find({ TeacherId: userId });
      const subjectIds = teacherSubjects.map((relation) => relation.SubjectId);
  
      if (subjectIds.length === 0) {
        return res.status(404).json({ message: "No subjects found for the teacher" });
      }
  
      // Step 3: Fetch notes for these subjects
      const notes = await Notes.find({ subjectID: { $in: subjectIds } });
  
      res.status(200).json({
        message: "Notes retrieved successfully",
        notes,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };


  const viewNotesByStudent = async (req, res) => {
    const { userId } = req.body;
  
    try {
      // Step 1: Verify if the user is a student
      const user = await Users.findOne({ id: userId });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      if (user.role.toLowerCase() !== "student") {
        return res.status(403).json({ message: "incorrect API-role relation" });
      }
  
      // Step 2: Extract semester and branch from the student table
      const student = await Students.findOne({ id: userId });
      if (!student) {
        return res.status(404).json({ message: "Student details not found" });
      }
  
      const { semester, branch } = student;
  
      // Step 3: Get all subject IDs for the student's semester and branch
      const subjects = await Subjects.find({ semester, branch });
      const subjectIds = subjects.map((subject) => subject.SubjectId);
  
      if (subjectIds.length === 0) {
        return res.status(404).json({
          message: "No subjects found for the student's semester and branch",
        });
      }
  
      // Step 4: Fetch notes for these subjects
      const notes = await Notes.find({ subjectID: { $in: subjectIds } });
  
      res.status(200).json({
        message: "Notes retrieved successfully",
        notes,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };



module.exports = { addNoteTeacher, addNoteByStudent, deleteNote, viewNotesByStudent, viewNotesByTeacher};