import { existsSync, readFileSync } from "fs";

console.log("\n Validating environment configuration...\n");

// Check if .env file exists
if (!existsSync(".env")) {
  console.error(" .env file not found!");
  console.error("\nPlease create a .env file with the following content:");
  console.error("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.error("PORT=3001");
  console.error(
    "JWT_SECRET=your-super-secret-jwt-key-at-least-32-characters-long"
  );
  console.error("DB_PATH=./database.sqlite");
  console.error("IPINFO_TOKEN=optional-token-from-ipinfo.io");
  console.error("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
  process.exit(1);
}

// Load and parse .env
const envContent = readFileSync(".env", "utf8");
const envVars = {};
envContent.split("\n").forEach((line) => {
  const [key, ...valueParts] = line.split("=");
  if (key && valueParts.length) {
    envVars[key.trim()] = valueParts.join("=").trim();
  }
});

// Validate JWT_SECRET
if (!envVars.JWT_SECRET) {
  console.error(" JWT_SECRET is missing from .env file!");
  console.error("\nAdd this line to your .env file:");
  console.error(
    "JWT_SECRET=your-super-secret-jwt-key-at-least-32-characters-long\n"
  );
  process.exit(1);
}

if (envVars.JWT_SECRET.length < 32) {
  console.warn(
    "  WARNING: JWT_SECRET is too short (should be at least 32 characters)"
  );
  console.warn(
    "Consider using: node -e \"console.log(require('crypto').randomBytes(32).toString('hex'))\"\n"
  );
}

console.log(" .env file exists");
console.log(` JWT_SECRET configured (${envVars.JWT_SECRET.length} characters)`);
console.log(` PORT: ${envVars.PORT || "3001 (default)"}`);
console.log(` DB_PATH: ${envVars.DB_PATH || "./database.sqlite (default)"}`);

if (envVars.IPINFO_TOKEN) {
  console.log(" IPINFO_TOKEN configured");
} else {
  console.log("ℹ  IPINFO_TOKEN not set (optional - using free tier)");
}

console.log("\n All validations passed! Ready to run.\n");
