import dotenv from "dotenv";
import { User } from "../src/models/User.js";
import "../src/config/database.js";

dotenv.config();

const seedUsers = () => {
  try {
    // Create test user
    const userId = User.create("test@example.com", "password123");
    console.log("✅ User seeded successfully!");
    console.log("Email: test@example.com");
    console.log("Password: password123");
    console.log(`User ID: ${userId}`);
  } catch (error) {
    if (error.message.includes("UNIQUE constraint failed")) {
      console.log("ℹ️  Test user already exists");
    } else {
      console.error("❌ Error seeding user:", error.message);
    }
  }
};

seedUsers();
