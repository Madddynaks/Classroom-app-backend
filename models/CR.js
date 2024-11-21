const mongoose = require("mongoose");

const CRSchema = new mongoose.Schema({
  id: { type: String, required: true },
});

module.exports = mongoose.model("CR", CRSchema);
