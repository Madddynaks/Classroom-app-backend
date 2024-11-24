const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');
const announcementRoutes = require('./routes/announcementRoutes');
require('dotenv').config();

// Import routes
const emailRoutes = require('./routes/emailRoutes'); // Make sure this is correct path

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

// Database Connection
connectDB();

// Routes
app.use('/', emailRoutes);
app.use("/api/announcements", announcementRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
