import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

// Helper function to get JWT secret safely at runtime
const getJWTSecret = () => {
  return (
    process.env.JWT_SECRET || "dev-fallback-secret-please-set-jwt-secret-in-env"
  );
};

export const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const user = User.findByEmail(email);

  if (!user || !User.verifyPassword(password, user.password)) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  try {
    // Get secret at request time, not module load time
    const JWT_SECRET = getJWTSecret();

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("JWT signing error:", error.message);
    res.status(500).json({ error: "Failed to generate authentication token" });
  }
};

export const verifyToken = (req, res) => {
  const user = User.findById(req.userId);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.json({
    user: {
      id: user.id,
      email: user.email,
    },
  });
};
