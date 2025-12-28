// ========================================
// dotenv loaded via -r flag in package.json
// ========================================
import { User } from "../src/models/User.js";
import { initDatabase } from "../src/config/database.js";

const seedUsers = async () => {
  if (!process.env.JWT_SECRET) {
    console.warn("\n  WARNING: JWT_SECRET not set in .env file");
    console.warn("Using fallback secret for development\n");
  }

  try {
    await initDatabase();

    const userId = User.create("test@example.com", "password123");
    console.log("\n User seeded successfully!");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log(" Email: test@example.com");
    console.log(" Password: password123");
    console.log(` User ID: ${userId}`);
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
  } catch (error) {
    if (error.message && error.message.includes("UNIQUE")) {
      console.log("\nℹ  Test user already exists");
      console.log(" Email: test@example.com");
      console.log(" Password: password123\n");
    } else {
      console.error("\n Error seeding user:", error.message, "\n");
    }
  }
};

seedUsers();
