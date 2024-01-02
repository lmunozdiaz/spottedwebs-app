import db from "@config/db/database.js";

async function insertOne(username, hashedPassword) {
  try {
    let [insertedUser] = await db.query(
      "INSERT INTO User (username, hashedPassword) VALUES (?, ?);",
      [username, hashedPassword]
    );
    return insertedUser;
  } catch (error) {
    console.log(error);
  }
}

async function findOne(username) {
  try {
    let [user] = await db.query("SELECT * FROM User WHERE username = ?;", [
      username,
    ]);
    return user;
  } catch (error) {
    console.log(error);
  }
}

export default { insertOne, findOne };
