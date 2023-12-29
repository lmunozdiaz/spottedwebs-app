import { pool } from "@config/db/database";

// TODO: Figure out whether to have User and UserProfile APIs.
// Do I need one API for users? What's the purpose of the User API? Is it to
// get user ID, usernames, and passwords? Or to get user profile information, like username,
// first name, and last name? Should there be two APIs? Should I have only one table, User,
// and filter out attributes like 'password' in the repository or controller code?

export async function insertOne(username, hashedPassword, firstName, lastName) {
  try {
    const INSERT_USER =
      "INSERT INTO User (username, hashedPassword) VALUES (?, ?);";
    const CREATE_PROFILE =
      "INSERT INTO UserProfile (firstName, lastName, userId) VALUES (?, ?, ?);";
    const GET_USER_PROFILE = `
      SELECT user.username, profile.firstName, profile.lastName, profile.objectKey
      FROM User AS user
      INNER JOIN UserProfile AS profile
      ON user.id = profile.userId
      WHERE user.id = ?;
    `;

    let [userToInsert] = await pool.query(INSERT_USER, [
      username,
      hashedPassword,
    ]);

    let { insertId } = userToInsert;
    await pool.query(CREATE_PROFILE, [firstName, lastName, insertId]);

    let [newUserProfile] = await pool.query(GET_USER_PROFILE, [insertId]);
    return newUserProfile;
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
