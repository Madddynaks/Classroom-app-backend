const mongoose = require("mongoose");

const SubjectSchema = new mongoose.Schema({
  SubjectId: { type: String, required: true },
  name: { type: String, required: true },
  semester: {type: Number, required: true},
  branch: {type: String, required: true},
});

module.exports = mongoose.model("Subjects", SubjectSchema);
