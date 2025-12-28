import dotenv from "dotenv";
import { readFileSync } from "fs";

dotenv.config();

console.log("\n🔍 Environment Variable Check\n");

const requiredVars = ["JWT_SECRET", "PORT"];
const optionalVars = ["DB_PATH", "IPINFO_TOKEN"];

let hasErrors = false;

// Check required variables
console.log("Required Variables:");
requiredVars.forEach((varName) => {
  const value = process.env[varName];
  if (!value) {
    console.log(`❌ ${varName}: NOT SET`);
    hasErrors = true;
  } else {
    const display =
      varName === "JWT_SECRET"
        ? `${value.substring(0, 10)}... (${value.length} characters)`
        : value;
    console.log(`✅ ${varName}: ${display}`);
  }
});

// Check optional variables
console.log("\nOptional Variables:");
optionalVars.forEach((varName) => {
  const value = process.env[varName];
  if (!value) {
    console.log(`⚠️  ${varName}: Not set (using default)`);
  } else {
    console.log(`✅ ${varName}: ${value}`);
  }
});

// Check .env file exists
try {
  readFileSync(".env", "utf8");
  console.log("\n✅ .env file exists");
} catch (error) {
  console.log("\n❌ .env file not found!");
  console.log("Please create a .env file from .env.example");
  hasErrors = true;
}

if (hasErrors) {
  console.log(
    "\n❌ Configuration errors found. Please fix them before running the app.\n"
  );
  process.exit(1);
} else {
  console.log("\n✅ All required environment variables are configured!\n");
}
