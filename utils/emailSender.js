const nodemailer = require('nodemailer');

// Send email
const sendEmail = async (to, subject, text) => {
    console.log("here2", to, subject, text);
    const transporter = nodemailer.createTransport({
        service: 'gmail', // Replace with your email provider
        auth: {
            user: 'nakulx1000@gmail.com', // Replace with your email
            pass: 'ohdm iiem qblq tdek', // Replace with your email password
        },
    });

    const mailOptions = {
        from: 'nakulx1000@gmail.com',
        to: to,
        subject: subject,
        text: text,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Email sent to ${to}`);
    } catch (error) {
        console.error(`Failed to send email to ${to}:`, error.message);
    }
};

module.exports = { sendEmail };
