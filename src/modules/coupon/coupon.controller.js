import { Coupon } from "../../../database/models/coupon.model.js";
import { handleError } from "../../middlewares/catchError.js";

export const addCoupon = handleError(async (req, res) => {
  let isExist = await Coupon.findOne({ code: req.body.code });
  if (isExist) {
    return res.status(400).json({ message: "coupon already exists" });
  }
  let coupon = new Coupon(req.body);
  await coupon.save();
  res.status(201).json({ message: "coupon added", coupon });
});

export const getCoupon = handleError(async (req, res) => {
  let coupon = await Coupon.find();
  res.status(200).json({ coupon });
});

export const updateCoupon = handleError(async (req, res, next) => {
  let coupon = await Coupon.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!coupon) {
    return next(new Error("coupon not found"));
  }
  res.status(200).json({ message: "coupon updated", coupon });
});

export const deleteCoupon = handleError(async (req, res, next) => {
  let coupon = await Coupon.findByIdAndDelete(req.params.id);
  if (!coupon) {
    return next(new Error("coupon not found"));
  }
  res.status(200).json({ message: "coupon deleted", coupon });
});
