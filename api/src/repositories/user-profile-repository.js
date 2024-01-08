import db from "../database/database-connection.js";

async function insertOne(firstName, lastName, userId) {
  try {
    await db.query(
      "INSERT INTO UserProfile (firstName, lastName, userId) VALUES (?, ?, ?);",
      [firstName, lastName, userId]
    );
    const row = await findByUserId(userId);
    return row;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function findAll() {
  try {
    let [rows] = await db.query("SELECT * FROM UserProfile;");
    return rows;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function findByUserProfileId(userProfileId) {
  try {
    let [[row]] = await db.query(
      "SELECT * FROM UserProfile WHERE userProfileId = ?;",
      [userProfileId]
    );
    return row;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function findByUserId(userId) {
  try {
    let [[row]] = await db.query(
      "SELECT * FROM UserProfile WHERE userId = ?;",
      [userId]
    );
    return row;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function deleteByUserProfileId(userProfileId) {
  try {
    await db.query("DELETE FROM UserProfile WHERE userProfileId = ?;", [
      userProfileId,
    ]);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function deleteByUserId(userId) {
  try {
    await db.query("DELETE FROM UserProfile WHERE userId = ?;", [userId]);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export default {
  deleteByUserProfileId,
  deleteByUserId,
  findAll,
  findByUserProfileId,
  findByUserId,
  insertOne,
};
