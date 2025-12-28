// ========================================
// dotenv loaded via -r flag in package.json
// ========================================
import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import geoRoutes from "./routes/geo.js";
import { initDatabase } from "./config/database.js";

// Validate critical environment variables
if (!process.env.JWT_SECRET) {
  console.error("\n  WARNING: JWT_SECRET is not defined in .env file!");
  console.error(
    "Using fallback secret for development. This is NOT secure for production."
  );
  console.error("Please add JWT_SECRET to your .env file.\n");
}

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/geo", geoRoutes);

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// Initialize database then start server
initDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`\n API server running on http://localhost:${PORT}`);
      console.log(` Environment: ${process.env.NODE_ENV || "development"}`);
      console.log(` Database: ${process.env.DB_PATH || "./database.sqlite"}`);

      if (process.env.JWT_SECRET) {
        console.log(` JWT_SECRET: Configured`);
      } else {
        console.log(`  JWT_SECRET: Using fallback (not recommended)`);
      }
      console.log();
    });
  })
  .catch((err) => {
    console.error(" Failed to initialize database:", err);
    process.exit(1);
  });
