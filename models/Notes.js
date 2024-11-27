const mongoose = require("mongoose");

const NotesSchema = new mongoose.Schema({
  userID: {type: String, required: true},
  subjectID: {type: String, required: true},
  note: {type: String, required: true},
});

module.exports = mongoose.model("Notes", NotesSchema);
