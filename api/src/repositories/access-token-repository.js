import db from "../database/database-connection.js";

async function insertOne(userId, token, secretKey) {
  try {
    await db.query(
      "INSERT INTO AccessToken (userId, token, secretKey) VALUES (?, ?, ?);",
      [userId, token, secretKey]
    );
    const row = await findByUserId(userId);
    return row;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function findByToken(token) {
  try {
    const [[row]] = await db.query(
      "SELECT * FROM AccessToken WHERE token = ?;",
      [token]
    );
    return row;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function findByUserId(userId) {
  try {
    const [[row]] = await db.query(
      "SELECT * FROM AccessToken WHERE userId = ?;",
      [userId]
    );
    return row;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function deleteByUserId(userId) {
  try {
    await db.query("DELETE FROM AccessToken WHERE userId = ?;", [userId]);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export default {
  deleteByUserId,
  findByToken,
  findByUserId,
  insertOne,
};
