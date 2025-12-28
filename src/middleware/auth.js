import jwt from "jsonwebtoken";

// Helper function to get JWT secret safely at runtime
const getJWTSecret = () => {
  return (
    process.env.JWT_SECRET || "dev-fallback-secret-please-set-jwt-secret-in-env"
  );
};

export const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ error: "Authentication required" });
  }

  try {
    // Get secret at request time, not module load time
    const JWT_SECRET = getJWTSecret();

    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};
