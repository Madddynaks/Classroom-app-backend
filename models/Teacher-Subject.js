const mongoose = require("mongoose");

const TeacherSubjectSchema = new mongoose.Schema({
  SubjectId: { type: String, required: true },
  TeacherId: {type: String, required: true },
});

module.exports = mongoose.model("Teacher-Subject", TeacherSubjectSchema);
