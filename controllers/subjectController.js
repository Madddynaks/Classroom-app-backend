const Subjects = require("../models/Subjects"); // Import Subjects model

// Function to fetch all subjects
const fetchAllSubjects = async (req, res) => {
    try {
        // Fetch all subjects from the database
        const subjects = await Subjects.find();

        // Check if subjects were found
        if (!subjects || subjects.length === 0) {
            return res.status(404).json({ message: "No subjects found" });
        }

        // Send successful response
        res.status(200).json({ message: "Subjects retrieved successfully", subjects });
    } catch (error) {
        console.error("Error retrieving subjects:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { fetchAllSubjects };
