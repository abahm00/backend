import { model, Schema, Types } from "mongoose";

const subCategorySchema = new Schema(
  {
    name: {
      type: String,
      unique: [true, "name is required"],
      trim: true,
    },
    slug: {
      type: String,
      lowerCase: true,
      required: true,
    },
    createdBy: {
      type: Types.ObjectId,
      ref: "User",
    },
    img: String,
    category: {
      type: Types.ObjectId,
      ref: "Category",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

subCategorySchema.pre("init", function (doc) {
  doc.img = "http://localhost:3001/upload/subCategory/" + doc.img;
});

export const SubCategory = model("SubCategory", subCategorySchema);
