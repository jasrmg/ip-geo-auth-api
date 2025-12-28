import db from "../config/database.js";
import bcrypt from "bcryptjs";

export const User = {
  create: (email, password) => {
    const hashedPassword = bcrypt.hashSync(password, 10);
    const stmt = db.prepare(
      "INSERT INTO users (email, password) VALUES (?, ?)"
    );
    const result = stmt.run(email, hashedPassword);
    return result.lastInsertRowid;
  },

  findByEmail: (email) => {
    const stmt = db.prepare("SELECT * FROM users WHERE email = ?");
    return stmt.get(email);
  },

  findById: (id) => {
    const stmt = db.prepare(
      "SELECT id, email, created_at FROM users WHERE id = ?"
    );
    return stmt.get(id);
  },

  verifyPassword: (plainPassword, hashedPassword) => {
    return bcrypt.compareSync(plainPassword, hashedPassword);
  },
};
