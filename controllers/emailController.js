const { extractDataFromExcel, generateUniqueId, generatePassword } = require('../services/excelService');
const { sendEmail } = require('../utils/emailSender');
const StudentData = require('../models/Students');
const TeacherData = require('../models/Teachers');
const UserData = require('../models/Users');
const NotesData = require('../models/Notes');
const FeedbackData = require('../models/Feedback');
const ClassroomData = require('../models/Classroom');
const CRData = require('../models/CR');

// const registerStudent = async (req, res) => {
//     try {
//         const { filePath } = req.body;
//         const data = extractDataFromExcel(filePath);

//         for (const row of data) {
//             const { Name, Rollno, semester, branch, Email } = row;
//             console.log(row);
//             const role = "Student"
//             const uniqueId = generateUniqueId();
//             const password = generatePassword();
//             const studentData = new StudentData({
//                 id: uniqueId, // `uniqueId` maps to `id`
//                 name: Name,   // `Name` maps to `name`
//                 rollno: Rollno.toString(), // Convert Rollno to string as schema expects a String
//                 semester,
//                 branch,
//             });
            

//             const emailContent = `
//                 Hello ${Name},

//                 Your account has been created successfully.

//                 Unique ID: ${uniqueId}
//                 Password: ${password}

//                 Please keep these details secure.

//                 Regards,
//                 Admin Team
//             `;

//             await sendEmail(Email, 'Your Account Details', emailContent);
//             await studentData.save()
            
//         }
//         res.status(201).send({ message: 'Emails sent successfully!' });
//     } catch (error) {
//         console.error('Error processing Excel data:', error);
//         res.status(500).send({ error: 'Failed to process data and send emails' });
//     }
// };

const registerStudent = async (req, res) => {
    try {
        const { filePath } = req.body;
        const data = extractDataFromExcel(filePath);

        for (const row of data) {
            const { Name, Rollno, semester, branch, Email } = row;

            if (!Name || !Rollno || !semester || !branch || !Email) {
                console.error('Invalid row:', row);
                continue; // Skip invalid rows
            }

            const role = "Student";
            const uniqueId = generateUniqueId();
            const password = generatePassword();

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
                password, 
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

            await sendEmail(Email, 'Your Account Details', emailContent);

            // Attempt to save the student data
            try {
                await studentData.save();
                await userData.save();
            } catch (err) {
                console.error('Error saving student data:', err);
                continue; // Skip to next row on error
            }
        }

        res.status(201).send({ message: 'Emails sent and data saved successfully!' });
    } catch (error) {
        console.error('Error processing Excel data:', error);
        res.status(500).send({ error: 'Failed to process data and send emails' });
    }
};

const registerTeacher = async (req, res) => {
    try {
        const { filePath } = req.body;
        const data = extractDataFromExcel(filePath);

        for (const row of data) {
            const { Name, Email } = row;
            const uniqueId = generateUniqueId();
            const password = generatePassword();
            const role = "Teacher"

            const userData = new UserData({
                id: uniqueId, 
                email: Email, 
                password, 
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

            await sendEmail(Email, 'Your Account Details', emailContent);

            try {
                await teacherData.save();
                await userData.save();
            } catch (err) {
                console.error('Error saving teacher data:', err);
                continue; // Skip to next row on error
            }

        }

        res.status(200).send({ message: 'Emails sent successfully!' });
    } catch (error) {
        console.error('Error processing Excel data:', error);
        res.status(500).send({ error: 'Failed to process data and send emails' });
    }
};

module.exports = { registerStudent, registerTeacher };
