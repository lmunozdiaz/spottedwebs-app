import db from "@config/db/database.js";

export async function insertOne(userProfile) {
  try {
    let { objectKey, firstName, lastName, userId } = userProfile;
    await db.query(
      "INSERT INTO UserProfile (objectKey, firstName, lastName, userId) VALUES (?, ?, ?, ?);",
      [objectKey, firstName, lastName, userId]
    );
  } catch (error) {
    console.log(error);
  }
}
