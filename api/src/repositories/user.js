import { pool } from "@config/db/database";

export async function insertOne(username, password) {
  try {
    const INSERT_STATEMENT =
      "INSERT INTO User (username, password) VALUES (?, ?);";

    let [insertedUser] = await pool.query(INSERT_STATEMENT, [
      username,
      password,
    ]);

    let { insertId } = insertedUser;
    let newUser = await findById(insertId);
    return newUser;
  } catch (error) {
    console.log("Query error:", error);
  }
}

export async function findById(id) {
  try {
    const SELECT_STATEMENT = "SELECT * FROM User WHERE id = ?";
    let [user] = await pool.query(SELECT_STATEMENT, [id]);
    return user;
  } catch (error) {
    console.log("Query error:", error);
  }
}

export async function findByUsername(username) {
  try {
    const SELECT_STATEMENT = "SELECT * FROM User WHERE username = ?;";
    let [user] = await pool.query(SELECT_STATEMENT, [username]);
    return user;
  } catch (error) {
    console.log("Query error:", error);
  }
}
