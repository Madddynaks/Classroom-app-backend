const express = require("express");
const { addAnnouncement, fetchAnnouncements, deleteAnnouncement } = require("../controllers/announcementController");
const authenticateUser = require("../middleware/authenticateUser");
const router = express.Router();

// Route to add announcements
router.post("/add", authenticateUser , addAnnouncement);
router.delete("/delete",authenticateUser, deleteAnnouncement);
router.post("/fetch",authenticateUser, fetchAnnouncements);


module.exports = router;
