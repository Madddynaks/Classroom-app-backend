const mongoose = require("mongoose");

const FeedbackSchema = new mongoose.Schema({
  studentID: {type: String, required: true},
  subjectID: {type: String, required: true},
  feedback: {type: String, required: true},
});

module.exports = mongoose.model("Feedbacks", FeedbackSchema);
