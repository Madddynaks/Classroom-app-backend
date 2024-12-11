const User = require("../models/Users");
const Announcement = require("../models/Announcements");
const Student = require("../models/Students");

// Controller to add announcement
const addAnnouncement = async (req, res) => {
	try {
		const { semesters, announcementText } = req.body;

		const teacherId = req.body.user_id;

		// Check if the user is a Teacher
		if (req.body.role.toLowerCase() !== "teacher") {
			return res
				.status(403)
				.json({ message: "Only teachers are allowed to create announcements" });
		}

		// Check for missing fields
		if (!teacherId || !semesters || !announcementText) {
			return res.status(400).json({ message: "All fields are required" });
		}

		// Create announcement data for each semester
		const announcementData = semesters.map((sem) => ({
			TeacherId: teacherId,
			semester: sem.semester,
			branch: sem.branch,
			announcement: announcementText,
		}));

		// Insert multiple announcements into the database
		await Announcement.insertMany(announcementData);

		res.status(201).json({ message: "Announcements added successfully" });
	} catch (error) {
		console.error("Error adding announcement:", error);
		res.status(500).json({ message: "Server error", error });
	}
};

const deleteAnnouncement = async (req, res) => {
	try {
		const { id, user_id, role } = req.body;

		if (!id) {
			return res.status(400).json({ message: "Announcement ID is required" });
		}
		if (role.toLowerCase() !== "teacher") {
			return res.status(403).json({ message: "Unautherized Access" });
		}

		// Find and delete the announcement by ID
		const deletedAnnouncement = await Announcement.findOne({_id: id });

		if (!deletedAnnouncement) {
			return res.status(404).json({ message: "Announcement not found" });
		}

		if (deletedAnnouncement.TeacherId !== user_id) {
			return res.status(403).json({ message: "Unautherized Access" });
		}
		await Announcement.findByIdAndDelete({_id : id});

		res.status(200).json({
			message: "Announcement deleted successfully",
			data: deletedAnnouncement,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server error", error });
	}
};

const fetchAnnouncements = async (req, res) => {
	try {
		const userId = req.body.user_id;

		if (!userId) {
			return res.status(400).json({ message: "User ID is required" });
		}

		// Fetch the user by ID
		const user = await User.findOne({ id: userId });
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		if (user.role.toLowerCase() === "teacher") {

			const announcements = await Announcement.find({ TeacherId: userId });
			return res
				.status(200)
				.json({ message: "Announcements fetched successfully", data: announcements });
		} else if (user.role.toLowerCase() === "student") {

			const student = await Student.findOne({ id: userId });
			if (!student) {
				return res.status(404).json({ message: "Student record not found" });
			}

			const announcements = await Announcement.find({
				semester: student.semester,
				branch: student.branch,
			});

			return res
				.status(200)
				.json({ message: "Announcements fetched successfully", data: announcements });
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server error", error });
	}
};

module.exports = { addAnnouncement, fetchAnnouncements, deleteAnnouncement };

 