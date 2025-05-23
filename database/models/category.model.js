import { model, Schema, Types } from "mongoose";

const categorySchema = new Schema({
  name: {
    type: String,
    unique: [true, "name is required"],
    required: true,
    minLenght: [3, "too short"],
    trim: true,
  },
  slug: {
    type: String,
    unique: [true, "name is required"],
    lowerCase: true,
    required: true,
  },
  createdBy: {
    type: Types.ObjectId,
    ref: "User",
  },
  img: { type: String, required: true },
});

categorySchema.pre("init", function (doc) {
  doc.img = "http://localhost:3001/upload/category/" + doc.img;
});

export const Category = model("Category", categorySchema);
