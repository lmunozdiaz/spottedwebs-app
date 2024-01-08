import db from "../database/database-connection.js";

async function insertOne(username, password) {
  try {
    const [results] = await db.query(
      "INSERT INTO User (username, hashedPassword) VALUES (?, ?);",
      [username, password]
    );
    const { insertId } = results;
    const row = await findByUserId(insertId);
    return row;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function findAll() {
  try {
    const [[rows]] = await db.query("SELECT * FROM User;");
    return rows;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function findByUserId(userId) {
  try {
    const [[rows]] = await db.query("SELECT * FROM User WHERE userId = ?;", [
      userId,
    ]);
    return rows;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function findByUsername(username) {
  try {
    const [[rows]] = await db.query("SELECT * FROM User WHERE username = ?;", [
      username,
    ]);
    return rows;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function deleteByUserId(userId) {
  try {
    await db.query("DELETE FROM User WHERE userId = ?;", [userId]);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function deleteByUsername(username) {
  try {
    await db.query("DELETE FROM User WHERE username = ?;", [username]);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export default {
  deleteByUserId,
  deleteByUsername,
  findAll,
  findByUserId,
  findByUsername,
  insertOne,
};
