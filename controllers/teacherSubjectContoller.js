const TeacherSubject = require("../models/Teacher-Subject");
const Subject = require("../models/Subjects");
const Teacher = require("../models/Teachers");

// Function to assign subjects to a teacher
const assignSubjectsToTeacher = async (req, res) => {
	const { user_id, subjectIds } = req.body;
	teacherId - user_id;

	try {
		// Validate input
		if (!teacherId || !subjectIds || !Array.isArray(subjectIds)) {
			return res
				.status(400)
				.json({ message: "Invalid input. Provide teacherId and subjectIds as an array." });
		}

		// Check if the teacher exists
		const teacherExists = await Teacher.findOne({ id: teacherId });
		if (!teacherExists) {
			return res.status(404).json({ message: "Teacher not found." });
		}

		// Validate that all subjectIds exist
		const validSubjects = await Subject.find({ SubjectId: { $in: subjectIds } });
		if (validSubjects.length !== subjectIds.length) {
			return res.status(400).json({ message: "One or more SubjectIds are invalid." });
		}

		// Prepare entries for the Teacher-Subject table
		const teacherSubjectEntries = subjectIds.map((subjectId) => ({
			SubjectId: subjectId,
			TeacherId: teacherId,
		}));

		// Insert records (ignore duplicates if already assigned)
		await TeacherSubject.insertMany(teacherSubjectEntries, { ordered: false });

		res.status(201).json({ message: "Subjects assigned successfully to the teacher." });
	} catch (error) {
		if (error.code === 11000) {
			return res
				.status(400)
				.json({ message: "Some subjects are already assigned to this teacher." });
		}
		console.error("Error assigning subjects:", error);
		res.status(500).json({ message: "Internal server error." });
	}
};

const getUnassignedSubjects = async (req, res) => {
	try {
		// Get all SubjectIds that are already assigned to teachers
		const assignedSubjects = await TeacherSubject.find({}, "SubjectId");
		const assignedSubjectIds = assignedSubjects.map((entry) => entry.SubjectId);

		// Fetch subjects that are not assigned
		const unassignedSubjects = await Subject.find({ SubjectId: { $nin: assignedSubjectIds } });

		res.status(200).json({
			message: "Unassigned subjects retrieved successfully.",
			unassignedSubjects,
		});
	} catch (error) {
		console.error("Error fetching unassigned subjects:", error);
		res.status(500).json({ message: "Internal server error." });
	}
};

const getSubjectsByTeacher = async (req, res) => {
	const { teacherId } = req.body.user_id;

	try {
		// Validate input
		if (!teacherId) {
			return res.status(400).json({ message: "TeacherId is required" });
		}

		// Find all SubjectIds assigned to the teacher
		const teacherSubjects = await TeacherSubject.find({ TeacherId: teacherId }, "SubjectId");

		if (teacherSubjects.length === 0) {
			return res.status(404).json({ message: "No subjects found for this teacher." });
		}

		const subjectIds = teacherSubjects.map((entry) => entry.SubjectId);

		// Fetch details of subjects from the Subjects table
		const subjects = await Subject.find({ SubjectId: { $in: subjectIds } });

		res.status(200).json({
			message: "Subjects retrieved successfully.",
			subjects,
		});
	} catch (error) {
		console.error("Error fetching subjects for teacher:", error);
		res.status(500).json({ message: "Internal server error." });
	}
};
const deleteTeacherSubjectRelation = async (req, res) => {
	const { teacherId, subjectId } = req.body;

	try {
		// Validate input
		if (!teacherId || !subjectId) {
			return res.status(400).json({ message: "Both teacherId and subjectId are required." });
		}

		// Check if the relation exists
		const relation = await TeacherSubject.findOne({
			TeacherId: teacherId,
			SubjectId: subjectId,
		});
		if (!relation) {
			return res
				.status(404)
				.json({ message: "No such relation found between the teacher and the subject." });
		}

		// Delete the relation
		await TeacherSubject.deleteOne({ TeacherId: teacherId, SubjectId: subjectId });

		res.status(200).json({ message: "Teacher-Subject relation deleted successfully." });
	} catch (error) {
		console.error("Error deleting teacher-subject relation:", error);
		res.status(500).json({ message: "Internal server error." });
	}
};

module.exports = { assignSubjectsToTeacher, getUnassignedSubjects, getSubjectsByTeacher, deleteTeacherSubjectRelation };
