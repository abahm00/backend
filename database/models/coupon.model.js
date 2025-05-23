import { model, Schema, Types } from "mongoose";

const couponSchema = new Schema(
  {
    code: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    expires: {
      type: Date,
    },
    discount: {
      type: Number,
    },
    comment: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Coupon = model("Coupon", couponSchema);
