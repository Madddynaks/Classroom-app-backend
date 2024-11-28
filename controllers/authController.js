const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Users = require("../models/Users");

const SECRET_KEY = "secret"; 

exports.login = async (req, res) => {
  const { email, password } = req.body;
  console.log("email : ", email, "password :" , password);

  try {
    // Find the user by email
    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare the entered password with the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Create a JWT token
    const token = jwt.sign(
      { user_id: user.id, role: user.role },
      SECRET_KEY,
      { expiresIn: "3h" } // Token valid for 3 hours
    );

    return res.status(200).json({ token });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
