const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  rollno: {type: String, required: true},
  semester: {type: Number, required: true},
  branch: {type: String, required: true},
});

module.exports = mongoose.model("Students", StudentSchema);
