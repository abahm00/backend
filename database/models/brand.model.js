import { model, Schema, Types } from "mongoose";

const brandSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: [3, "too short"],
      trim: true,
    },
    slug: {
      type: String,
      lowercase: true,
      required: true,
    },
    logo: {
      type: String,
      required: true,
    },
    createdBy: {
      type: Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true, versionKey: false }
);

brandSchema.pre("init", function (doc) {
  if (doc.logo) {
    doc.logo = "http://localhost:3001/upload/brand/" + doc.logo;
  }
});

export const Brand = model("Brand", brandSchema);
