import { pool } from "@config/db/database";

export async function insertOne(username, email, password) {
  try {
    const statement =
      "INSERT INTO User (username, email, password) VALUES (?, ?, ?);";
    const [result] = await pool.query(statement, [username, email, password]);
    const { insertId } = result;
    return await findById(insertId);
  } catch (error) {
    console.log("Query error:", error);
  }
}

export async function findByUsername(username) {
  try {
    const statement = "SELECT * FROM User WHERE username = ?;";
    const [result] = await pool.query(statement, [username]);
    return result;
  } catch (error) {
    console.log("Query error:", error);
  }
}
