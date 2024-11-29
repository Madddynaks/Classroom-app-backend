const mongoose = require("mongoose"); // Add this line if missing
const Feedback = require("../models/Feedback");
const Student = require("../models/Students");
const Subject = require("../models/Subjects");

const addFeedback = async (req, res) => {
	const { user_id, subjectID, feedback, role } = req.body;
	const studentID = user_id;
	if (role.toLowerCase() !== "student") {
		return res.status(400).json({ error: "Unautherized Access" });
	}

	try {
		// Validate inputs
		console.log(studentID, " ", subjectID, " ", feedback);
		if (!studentID || !subjectID || !feedback) {
			return res.status(400).json({ error: "All fields are required" });
		}

		// Check if student exists
		const student = await Student.findOne({ id: studentID });
		if (!student) {
			return res.status(404).json({ error: "Student not found" });
		}

		// Check if subject exists
		const subject = await Subject.findOne({ SubjectId: subjectID });
		if (!subject) {
			return res.status(404).json({ error: "Subject not found" });
		}

		// Validate semester and branch
		if (student.semester !== subject.semester || student.branch !== subject.branch) {
			return res.status(400).json({
				error: "Subject semester and branch do not match with student",
			});
		}

		// Create new feedback
		const newFeedback = new Feedback({
			feedbackID: new mongoose.Types.ObjectId().toString(), // Generate unique ID
			studentID,
			subjectID,
			feedback,
		});

		// Save to database
		await newFeedback.save();

		res.status(201).json({ message: "Feedback added successfully", newFeedback });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal server error" });
	}
};

const getSubjectsByStudent = async (req, res) => {
	const { user_id } = req.body; // Extract studentID from the request body
	const studentID = user_id;
	try {
		// Step 1: Validate the input
		if (!studentID) {
			return res.status(400).json({ error: "Student ID is required" });
		}

		// Step 2: Find the student
		const student = await Student.findOne({ id: studentID });
		if (!student) {
			return res.status(404).json({ error: "Student not found" });
		}

		// Step 3: Find subjects matching student's semester and branch
		const subjects = await Subject.find({
			semester: student.semester,
			branch: student.branch,
		});

		if (subjects.length === 0) {
			return res.status(404).json({ error: "No subjects found for the student" });
		}

		// Step 4: Return the subjects
		res.status(200).json({ message: "Subjects retrieved successfully", subjects });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal server error" });
	}
};

module.exports = { addFeedback, getSubjectsByStudent };
