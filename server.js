const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');
const announcementRoutes = require('./routes/announcementRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
require('dotenv').config();

// Import routes
const emailRoutes = require('./routes/emailRoutes'); // Make sure this is correct path
const manageStudentsRoutes = require('./routes/manageStudentsRoutes');
const teacherSubjectRoutes = require('./routes/teacherSubjectRoutes');
const notesRoutes = require('./routes/notesRoutes');
const authRoutes = require("./routes/authRoutes");
const subjectRoutes = require("./routes/subjectRoutes");
const Subjects = require('./models/Subjects');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

// Database Connection
connectDB();

// Routes
app.use('/api', emailRoutes);
app.use("/api/announcements", announcementRoutes);
app.use("/api/manageStudents", manageStudentsRoutes);
app.use("/api", teacherSubjectRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api", notesRoutes);
app.use("/api", subjectRoutes);
app.use("/api/auth", authRoutes);


// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
