const express = require("express");
const { addAnnouncement , deleteAnnouncement , fetchAnnouncements } = require("../controllers/announcementController");
const router = express.Router();

// Route to add announcements
router.post("/add", addAnnouncement);
router.delete("/delete", deleteAnnouncement);
router.post("/fetch", fetchAnnouncements);

module.exports = router;
