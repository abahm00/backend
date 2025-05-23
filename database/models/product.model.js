import { model, Schema, Types } from "mongoose";

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      minLenght: [2, "too short"],
      trim: true,
      unique: true,
    },
    slug: {
      type: String,
    },
    description: {
      type: String,
      minLenght: 5,
      required: true,
      maxLength: 1000,
    },
    imgCover: String,
    images: [String],
    price: { type: Number, required: true, min: 0 },
    priceAfterDiscount: { type: Number, min: 0 },
    sold: Number,
    stock: {
      type: Number,
      required: true,
      min: 0,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    subCategory: {
      type: Schema.Types.ObjectId,
      ref: "SubCategory",
    },
    brand: {
      type: Schema.Types.ObjectId,
      ref: "Brand",
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    rateAvg: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    rateCount: { type: Number, default: 0 },
    reviews: [
      {
        user: { type: Schema.Types.ObjectId, ref: "User", required: true },
        comment: { type: String, default: "" },
        rating: { type: Number, required: true, min: 0, max: 5 },
      },
    ],
  },
  { timestamps: true, versionKey: false }
);

productSchema.pre("init", function (doc) {
  if (doc.imgCover) {
    doc.imgCover = "http://localhost:3001/upload/product/" + doc.imgCover;
  }

  if (Array.isArray(doc.images)) {
    doc.images = doc.images.map(
      (file) => "http://localhost:3001/upload/product/" + file
    );
  } else {
    doc.images = [];
  }
});

export const Product = model("Product", productSchema);
