import { handleError } from "../../middlewares/catchError.js";
import { User } from "./../../../database/models/user.model.js";

export const getUsers = handleError(async (req, res) => {
  let users = await User.find();
  res.json({ users });
});

export const updateUser = handleError(async (req, res) => {
  let user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json({ message: "updated", user });
});

export const deleteUser = handleError(async (req, res) => {
  let user = await User.findByIdAndDelete(req.params.id);
  res.json({ message: "deleted", user });
});

export const addUser = handleError(async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const existing = await User.findOne({ email });
  if (existing) {
    return res.status(409).json({ message: "User already exists" });
  }

  const newUser = new User({ name, email, password, role });
  await newUser.save();

  res.status(201).json({ message: "User added", user: newUser });
});
