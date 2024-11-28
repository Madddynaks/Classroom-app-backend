const express = require("express");
const { addAnnouncement, fetchAnnouncements } = require("../controllers/announcementController");
const authenticateUser = require("../middleware/authenticateUser");
const router = express.Router();

// Route to add announcements
router.post("/add", authenticateUser , addAnnouncement);
// router.delete("/delete", deleteAnnouncement);
router.post("/fetch", fetchAnnouncements);

module.exports = router;
