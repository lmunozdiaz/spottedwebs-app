import { pool } from "@config/db/database";

export async function insertOne(firstName, lastName, userId) {
  try {
    const INSERT_USER_PROFILE =
      "INSERT INTO UserProfile (fistName, lastName, userId) VALUES (?, ?, ?);";

    let [profileToInsert] = await pool.query(INSERT_USER_PROFILE, [
      firstName,
      lastName,
      userId,
    ]);

    let isInserted = profileToInsert != null;

    return isInserted;
  } catch (error) {
    console.log("Repository error:", error);
  }
}
