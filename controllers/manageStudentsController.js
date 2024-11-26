const User = require("../models/Users"); // Import User model
const CR = require("../models/CR"); // Import CR model

// Function to add a CR
const addCR = async (req, res) => {
  const { id } = req.body;

  try {
    // Validate request body
    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }

    // Check if the user exists with role === 'Student'
    const user = await User.findOne({ id, role: "Student" });
    if (!user) {
      return res.status(404).json({ message: "User not found or not a Student" });
    }

    // Check if the ID already exists in the CR table
    const existingCR = await CR.findOne({ id });
    if (existingCR) {
      return res.status(400).json({ message: "This user is already a CR" });
    }

    // Add the ID to the CR table
    const newCR = new CR({ id });
    await newCR.save();

    // Update the role of the user in the User table
    user.role = "CR";
    await user.save();

    res.status(201).json({ message: "CR added successfully", cr: newCR });
  } catch (error) {
    console.error("Error adding CR:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { addCR };
