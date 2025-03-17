const jwt = require("jsonwebtoken");
const User = require("../User/UserSchema");
require("dotenv").config();

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Access Denied! No token provided." });
    }

    const token = authHeader.split(" ")[1];
    const secretKey = process.env.SECRET_KEY || "fallback_secret";

    let decoded;
    try {
      decoded = jwt.verify(token, secretKey);
    } catch (error) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found. Authentication failed." });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error);
    return res.status(500).json({ message: "Authentication error" });
  }
};

module.exports = authenticate;
