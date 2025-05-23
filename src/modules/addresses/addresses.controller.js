import { User } from "../../../database/models/user.model.js";
import { handleError } from "../../middlewares/catchError.js";

export const addAddress = handleError(async (req, res) => {
  let addresses = await User.findOneAndUpdate(
    req.user._id,
    {
      $addToSet: {
        addresses: req.body,
      },
    },
    {
      new: true,
    }
  );
  if (!addresses) {
    return next(new Error("addresses not added"));
  }
  res.json({ message: "added to addresses", addresses: addresses.addresses });
});

export const deleteAddress = handleError(async (req, res, next) => {
  let addresses = await User.findOneAndUpdate(
    req.user._id,
    {
      $pull: {
        addresses: req.body,
      },
    },
    {
      new: true,
    }
  );
  if (!addresses) {
    return next(new Error("addresses not found"));
  }
  res.json({ message: "addresses updated", addresses: addresses.addresses });
});

export const getAddresses = handleError(async (req, res) => {
  let addresses = await User.findById(req.user._id);
  res.json({ addresses: addresses.addresses });
});
