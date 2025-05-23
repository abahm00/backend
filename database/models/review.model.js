import { model, Schema, Types } from "mongoose";

const reviewSchema = new Schema(
  {
    product: {
      type: Types.ObjectId,
      ref: "Product",
      required: true,
    },
    rate: {
      type: Number,
      min: 0,
      max: 5,
      required: true,
    },
    user: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    comment: String,
  },
  {
    timestamps: true,
  }
);

reviewSchema.pre(/^find/, function () {
  this.populate("user", "name");
  this.populate("product");
});

export const Review = model("Review", reviewSchema);
