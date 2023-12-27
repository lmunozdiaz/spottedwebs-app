import { findByUsername, insertOne } from "@repositories/user";

export async function createUser(req, res) {
  try {
    const { username, password } = req.body;
    let hashedPassword = await Bun.password.hash(password);

    let [possibleUser] = await findByUsername(username);
    let userAlreadyExists = possibleUser != null;
    if (userAlreadyExists) return res.status(400).send("User already exists");

    let [newUser] = await insertOne(username, hashedPassword);
    let userNotCreated = newUser == null;
    if (userNotCreated) return res.status(404).send("User not created");
    return res.status(201).send(newUser);
  } catch (error) {
    console.log("Error:", error);
  }
}

export async function getUser(req, res) {
  try {
    const { username } = req.params;

    let [user] = await findByUsername(username);

    let userNotFound = user == null;
    if (userNotFound) {
      return res.status(404).send("No user found");
    }

    res.status(200).send(user);
  } catch (error) {
    console.log("Error:", error);
  }
}

export async function loginUser(req, res) {
  try {
    const { username, password } = req.body;

    let [user] = await findByUsername(username);
    let userNotFound = user == null;
    if (userNotFound) {
      return res.status(404).send("No user found");
    }

    let passwordComparison = await Bun.password.verify(
      password,
      user.hashedPassword
    );
    let passwordsMatch = passwordComparison == true;
    if (passwordsMatch) {
      console.log("Logged in!");
      req.session.user = user;
      return res.status(200).send(user);
    } else {
      return res.status(400).send("Wrong crendentials");
    }
  } catch (error) {
    console.log("Error:", error);
  }
}

export async function logoutUser(req, res) {
  try {
    req.session.user = null;
    return res.status(200).send("Logged out");
  } catch (error) {
    console.log("Error:", error);
  }
}
