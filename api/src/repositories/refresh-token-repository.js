import db from "../database/database-connection.js";

async function insertOne(userId, token, secretKey) {
  try {
    await db.query(
      "INSERT INTO RefreshToken (userId, token, secretKey) VALUES (?, ?, ?);",
      [userId, token, secretKey]
    );
    const row = findByUserId(userId);
    return row;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function findByUserId(userId) {
  try {
    const [[row]] = await db.query(
      "SELECT * FROM RefreshToken WHERE userId = ?;",
      [userId]
    );
    return row;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function findByToken(token) {
  try {
    const [[row]] = await db.query(
      "SELECT * FROM RefreshToken WHERE token = ?;",
      [token]
    );
    return row;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function deleteByToken(token) {
  try {
    await db.query("DELETE FROM RefreshToken WHERE token = ?;", [token]);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function deleteByUserId(userId) {
  try {
    await db.query("DELETE FROM RefreshToken WHERE userId = ?;", [userId]);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export default {
  deleteByToken,
  deleteByUserId,
  findByToken,
  findByUserId,
  insertOne,
};
