import { prepare } from "../config/database.js";

export const SearchHistory = {
  create: (userId, ipAddress, geoData) => {
    const stmt = prepare(`
      INSERT INTO search_history 
      (user_id, ip_address, city, region, country, loc, org, postal, timezone)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const result = stmt.run(
      userId,
      ipAddress,
      geoData.city || null,
      geoData.region || null,
      geoData.country || null,
      geoData.loc || null,
      geoData.org || null,
      geoData.postal || null,
      geoData.timezone || null
    );

    return result.lastInsertRowid;
  },

  findByUserId: (userId) => {
    const stmt = prepare(`
      SELECT * FROM search_history 
      WHERE user_id = ? 
      ORDER BY searched_at DESC
    `);
    return stmt.all(userId);
  },

  deleteById: (id, userId) => {
    const stmt = prepare(
      "DELETE FROM search_history WHERE id = ? AND user_id = ?"
    );
    const result = stmt.run(id, userId);
    return result.changes > 0;
  },

  deleteMultiple: (ids, userId) => {
    const placeholders = ids.map(() => "?").join(",");
    const stmt = prepare(`
      DELETE FROM search_history 
      WHERE id IN (${placeholders}) AND user_id = ?
    `);
    const result = stmt.run(...ids, userId);
    return result.changes;
  },
};
