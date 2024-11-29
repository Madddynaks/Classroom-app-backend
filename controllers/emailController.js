const {
	extractDataFromExcel,
	generateUniqueId,
	generatePassword,
} = require("../services/excelService");
const bcrypt = require("bcryptjs");
const { sendEmail } = require("../utils/emailSender");
const StudentData = require("../models/Students");
const TeacherData = require("../models/Teachers");
const UserData = require("../models/Users");
const SubjectData = require("../models/Subjects");

const registerStudent = async (req, res) => {
	try {
		const { filePath } = req.body;
		const data = extractDataFromExcel(filePath);

		if (req.body.role !== "Admin") {
			return res
				.status(403)
				.json({ message: "Only Admins are allowed to Register Students" });
		}

		for (const row of data) {
			const { Name, Rollno, semester, branch, Email } = row;

			if (!Name || !Rollno || !semester || !branch || !Email) {
				console.error("Invalid row:", row);
				continue; // Skip invalid rows
			}

			const role = "Student";
			const uniqueId = generateUniqueId();
			const password = generatePassword();
			const hashedPassword = await bcrypt.hash(password, 10);

			const studentData = new StudentData({
				id: uniqueId,
				name: Name,
				rollno: Rollno.toString(),
				semester,
				branch,
			});

			const userData = new UserData({
				id: uniqueId,
				email: Email,
				password: hashedPassword,
				role,
			});

			const emailContent = `
                Hello ${Name},

                Your account has been created successfully.

                Unique ID: ${uniqueId}
                Password: ${password}

                Please keep these details secure.

                Regards,
                Admin Team
            `;

			await sendEmail(Email, "Your Account Details", emailContent);

			// Attempt to save the student data
			try {
				await studentData.save();
				await userData.save();
			} catch (err) {
				console.error("Error saving student data:", err);
				continue; // Skip to next row on error
			}
		}

		res.status(201).send({ message: "Emails sent and data saved successfully!" });
	} catch (error) {
		console.error("Error processing Excel data:", error);
		res.status(500).send({ error: "Failed to process data and send emails" });
	}
};

const addSubjectsExcel = async (req, res) => {
	try {
		const { filePath } = req.body;
		const data = extractDataFromExcel(filePath);

		if (req.body.role !== "Admin") {
			return res.status(403).json({ message: "Only Admins are allowed to Add Subjects" });
		}

		for (const row of data) {
			const { name, semester, branch } = row;

			if (!name || !semester || !branch) {
				console.error("Invalid row:", row);
				continue; // Skip invalid rows
			}
			const uniqueId = generateUniqueId();

			const subjectData = new SubjectData({
				SubjectId: uniqueId,
				name,
				semester,
				branch,
			});

			try {
				await subjectData.save();
			} catch (err) {
				console.error("Error saving student data:", err);
				continue;
			}
		}

		res.status(201).send({ message: "Subjects saved successfully!" });
	} catch (error) {
		console.error("Error processing Excel data:", error);
		res.status(500).send({ error: "Failed to process data and send emails" });
	}
};

const registerTeacher = async (req, res) => {
	try {
		const { filePath } = req.body;
		const data = extractDataFromExcel(filePath);

		if (req.body.role !== "Admin") {
			return res
				.status(403)
				.json({ message: "Only Admins are allowed to Register Teachers" });
		}

		for (const row of data) {
			const { Name, Email } = row;
			const uniqueId = generateUniqueId();
			const password = generatePassword();
			const hashedPassword = await bcrypt.hash(password, 10);
			const role = "Teacher";

			const userData = new UserData({
				id: uniqueId,
				email: Email,
				password: hashedPassword,
				role,
			});

			const teacherData = new TeacherData({
				id: uniqueId,
				name: Name,
			});

			const emailContent = `
                Hello ${Name},

                Your account has been created successfully.

                Unique ID: ${uniqueId}
                Password: ${password}

                Please keep these details secure.

                Regards,
                Admin Team
            `;

			await sendEmail(Email, "Your Account Details", emailContent);

			try {
				await teacherData.save();
				await userData.save();
			} catch (err) {
				console.error("Error saving teacher data:", err);
				continue; // Skip to next row on error
			}
		}

		res.status(200).send({ message: "Emails sent successfully!" });
	} catch (error) {
		console.error("Error processing Excel data:", error);
		res.status(500).send({ error: "Failed to process data and send emails" });
	}
};

module.exports = { registerStudent, registerTeacher, addSubjectsExcel };
