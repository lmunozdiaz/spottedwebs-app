import userRepository from "@/repositories/user";

export async function createUser(req, res) {
  try {
    const { username, password, firstName, lastName } = req.body;
    let hashedPassword = await Bun.password.hash(password);

    let [possibleUser] = await userRepository.findOne(username);
    let userAlreadyExists = possibleUser != null;
    if (userAlreadyExists) return res.status(400).json("User already exists");

    let [newUser] = await insertOne({
      username,
      hashedPassword,
    });
    let userNotCreated = newUser == null;
    if (userNotCreated) return res.status(404).json("User not created");

    return res.status(201).json(newUser);
  } catch (error) {
    console.log("Error:", error);
  }
}

export async function getUser(req, res) {
  try {
    const { username } = req.params;
    let user = await userRepository.findOne(username);
    return res.status(200).json(user);
  } catch (error) {
    console.log("Error:", error);
  }
}
