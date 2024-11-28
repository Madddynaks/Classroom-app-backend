const jwt = require("jsonwebtoken");
const SECRET_KEY = "secret"; // Use a more secure secret in production

const authenticateUser = async (req, res, next) => {
  try {
    // Extract token from the "token" header
    const token = req.headers.token; // Look for the token in the "token" header
    if (!token) {
      return res.status(401).json({ message: "Token missing" });
    }

    // Verify the token
    const decoded = jwt.verify(token, SECRET_KEY);
    const { user_id, role } = decoded;

    // Attach user details to req.body for further use
    req.body.user_id = user_id;
    req.body.role = role;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error("Authentication error:", error);

    // Handle token expiration error
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    }

    // Handle other token verification errors
    return res.status(403).json({ message: "Invalid token" });
  }
};

module.exports = authenticateUser;
