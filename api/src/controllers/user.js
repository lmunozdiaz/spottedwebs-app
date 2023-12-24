import { findByUsername, insertOne } from "@repositories/user";

export async function createUser(req, res) {
  try {
    const { username, email, password } = req.body;

    // does the user already exist?
    const [existingUser] = await findByUsername(username);
    if (existingUser) {
      res.status(400).send("User already exists");
      return;
    }

    const [user] = await insertOne(username, email, password);
    if (user == null) {
      res.status(404).send("User not created");
      return;
    }
    res.status(201).send(user);
  } catch (err) {
    const { sqlMessage } = err;
    res.status(400).send(sqlMessage);
  }
}

export async function getUser(req, res) {
  try {
    const { username } = req.params;
    const [user] = await findByUsername(username);
    if (user == null) {
      res.status(404).send("No user found");
      return;
    }
    res.status(200).send(user);
  } catch (err) {
    const { sqlMessage } = err;
    res.status(400).send(sqlMessage);
  }
}
