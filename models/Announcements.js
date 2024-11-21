const mongoose = require("mongoose");

const AnnouncementSchema = new mongoose.Schema({
  TeacherId: { type: String, required: true },
  semester: {type: Number, required: true},
  branch: {type: String, required: true},
  announcement : {type: String, required: true},
});

module.exports = mongoose.model("Announcements", AnnouncementSchema);
