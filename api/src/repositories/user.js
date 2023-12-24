import { pool } from "@config/db/database";

export async function insertOne(username, email, password) {
  const statement =
    "INSERT INTO User (username, email, password) VALUES (?, ?, ?);";
  const [result] = await pool.query(statement, [username, email, password]);
  const userId = result.insertId;
  return await findById(userId);
}

export async function findByUsername(username) {
  const statement = "SELECT * FROM User WHERE username = ?;";
  const [result] = await pool.query(statement, [username]);
  return result;
}
