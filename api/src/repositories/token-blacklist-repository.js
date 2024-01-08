import db from "../database/database-connection.js";

async function insertOne(userId, token) {
  try {
    await db.query(
      "INSERT INTO TokenBlacklist (userId, token) VALUES (?, ?);",
      [userId, token]
    );
    const row = findByToken(token);
    return row;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function findByToken(token) {
  try {
    const [[row]] = await db.query(
      "SELECT * FROM TokenBlacklist WHERE token = ?;",
      [token]
    );
    return row;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export default {
  findByToken,
  insertOne,
};
