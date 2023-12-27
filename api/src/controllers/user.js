import { findByUsername, insertOne } from "@repositories/user";

export async function createUser(req, res) {
  try {
    const { username, password } = req.body;

    let [possibleUser] = await findByUsername(username);
    let userAlreadyExists = possibleUser != null;

    if (userAlreadyExists) {
      res.status(400).send("User already exists");
      return;
    }

    let [newUser] = await insertOne(username, password);
    let userNotCreated = newUser == null;

    if (userNotCreated) {
      res.status(404).send("User not created");
      return;
    }

    res.status(201).send(newUser);
  } catch (error) {
    const { sqlMessage } = error;
    res.status(400).send(sqlMessage);
  }
}

export async function getUser(req, res) {
  try {
    const { username } = req.params;

    let [user] = await findByUsername(username);
    let userNotFound = user == null;

    if (userNotFound) {
      res.status(404).send("No user found");
      return;
    }

    res.status(200).send(user);
  } catch (error) {
    const { sqlMessage } = error;
    res.status(400).send(sqlMessage);
  }
}
