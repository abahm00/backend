import { User } from "./../../database/models/user.model.js";

export const checkEmail = async (req, res, next) => {
  try {
    let isFound = await User.findOne({ email: req.body.email });
    if (isFound) {
      return res.status(400).json({ message: "Email already exists" });
    }
    next();
  } catch (err) {
    next(err);
  }
};
