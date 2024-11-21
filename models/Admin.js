const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name : { type: String, required: true },
});

module.exports = mongoose.model("Admin", AdminSchema);
