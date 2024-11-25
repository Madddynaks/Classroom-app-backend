const User = require("../models/Users");
const Announcement = require("../models/Announcements");
const Student = require("../models/Students");

// Controller to add announcement
const addAnnouncement = async (req, res) => {
  try {
    const { teacherId, semesters, announcementText } = req.body;

    if (!teacherId || !semesters || !announcementText) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const announcementData = semesters.map((sem) => ({
      TeacherId: teacherId,
      semester: sem.semester,
      branch: sem.branch,
      announcement: announcementText,
    }));

    // Insert multiple announcements
    await Announcement.insertMany(announcementData);

    res.status(201).json({ message: "Announcements added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};

const deleteAnnouncement = async (req, res) => {
    try {
      const { id } = req.body;
  
      if (!id) {
        return res.status(400).json({ message: "Announcement ID is required" });
      }
  
      // Find and delete the announcement by ID
      const deletedAnnouncement = await Announcement.findByIdAndDelete(id);
  
      if (!deletedAnnouncement) {
        return res.status(404).json({ message: "Announcement not found" });
      }
  
      res.status(200).json({ message: "Announcement deleted successfully", data: deletedAnnouncement });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error", error });
    }
  };

  const fetchAnnouncements = async (req, res) => {
    try {
      const { userId } = req.body; // The user's ID is passed in the request body
  
      if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
      }
  
      // Fetch the user by ID
      const user = await User.findOne({ id: userId });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Check role and fetch announcements accordingly
      if (user.role.toLowerCase() === "teacher") {
        // If the user is a teacher, fetch announcements created by them
        const announcements = await Announcement.find({ TeacherId: userId });
        return res.status(200).json({ message: "Announcements fetched successfully", data: announcements });
      } else if (user.role.toLowerCase() === "student") {
        // If the user is a student, fetch their semester and branch
        const student = await Student.findOne({ id: userId });
        if (!student) {
          return res.status(404).json({ message: "Student record not found" });
        }
  
        // Fetch announcements for the student's semester and branch
        const announcements = await Announcement.find({
          semester: student.semester,
          branch: student.branch,
        });
  
        return res.status(200).json({ message: "Announcements fetched successfully", data: announcements });
      } else {
        return res.status(403).json({ message: "Unauthorized role" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error", error });
    }
  };

module.exports = { addAnnouncement , deleteAnnouncement , fetchAnnouncements };
