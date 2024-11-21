const { extractDataFromExcel, generateUniqueId, generatePassword } = require('../services/excelService');
const { sendEmail } = require('../utils/emailSender');

const processExcelAndSendEmailsStudents = async (req, res) => {
    try {
        const { filePath } = req.body;
        console.log("here");
        const data = extractDataFromExcel(filePath);

        for (const row of data) {
            const { Name, Rollno, Email } = row;
            const uniqueId = generateUniqueId();
            const password = generatePassword();
            console.log(row);

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
        }

        res.status(200).send({ message: 'Emails sent successfully!' });
    } catch (error) {
        console.error('Error processing Excel data:', error);
        res.status(500).send({ error: 'Failed to process data and send emails' });
    }
};

const processExcelAndSendEmailsTeachers = async (req, res) => {
    try {
        const { filePath } = req.body;
        console.log("here");
        const data = extractDataFromExcel(filePath);

        for (const row of data) {
            const { Name, Email } = row;
            const uniqueId = generateUniqueId();
            const password = generatePassword();
            console.log(row);

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
        }

        res.status(200).send({ message: 'Emails sent successfully!' });
    } catch (error) {
        console.error('Error processing Excel data:', error);
        res.status(500).send({ error: 'Failed to process data and send emails' });
    }
};

module.exports = { processExcelAndSendEmailsStudents, processExcelAndSendEmailsTeachers };
