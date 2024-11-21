const mongoose = require("mongoose");

const ClassroomSchema = new mongoose.Schema({
  subjectID: { type: String, required: true },
  studentID: {type: String, required: true},
});

module.exports = mongoose.model("Classrooms", ClassroomSchema);
