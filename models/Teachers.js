const mongoose = require("mongoose");

const TeacherSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
});

module.exports = mongoose.model("Teachers", TeacherSchema);
