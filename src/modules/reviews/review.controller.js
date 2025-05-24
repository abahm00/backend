import { Order } from "../../../database/models/order.model.js";
import { Product } from "../../../database/models/product.model.js";
import { handleError } from "../../middlewares/catchError.js";

async function hasUserPurchasedProduct(userId, productId) {
  const orders = await Order.find({
    user: userId,
    isPaid: true,
    "orderItems.product": productId,
  });
  return orders.length > 0;
}

export const addReview = async (req, res) => {
  try {
    const userId = req.user._id;
    const { product: productId, rating, comment = "" } = req.body;

    if (typeof rating !== "number" || rating < 0 || rating > 5) {
      return res.status(400).json({ message: "Invalid rating value" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const purchased = await hasUserPurchasedProduct(userId, productId);
    if (!purchased) {
      return res.status(403).json({
        message: "You can only review products you have purchased",
      });
    }

    const existingReview = product.reviews.find(
      (review) => review.user.toString() === userId.toString()
    );
    if (existingReview) {
      return res
        .status(400)
        .json({ message: "You have already reviewed this product" });
    }

    product.reviews.push({ user: userId, rating, comment });

    const totalRatings = product.reviews.reduce((sum, r) => sum + r.rating, 0);
    product.rateCount = product.reviews.length;
    product.rateAvg = totalRatings / product.rateCount;

    await product.save();

    return res.status(201).json({ message: "Review added", product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllReviews = handleError(async (req, res) => {
  const { id } = req.params;

  const product = await Product.findById(id);
  if (!product) {
    return res.status(404).json({ message: "Product not found." });
  }

  res.json({
    reviews: product.reviews,
    rateAvg: product.rateAvg,
    rateCount: product.rateCount,
  });
});

export const updateReview = handleError(async (req, res) => {
  const { rate: newRating, comment } = req.body;

  if (typeof newRating !== "number" || newRating < 0 || newRating > 5) {
    return res.status(400).json({ message: "Invalid review data." });
  }

  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(404).json({ message: "Product not found." });
  }

  const review = product.reviews.find(
    (r) => r.user.toString() === req.user._id.toString()
  );
  if (!review) {
    return res.status(400).json({ message: "Review not found." });
  }

  review.rating = newRating;
  review.comment = comment || review.comment;

  const ratings = product.reviews.map((review) => review.rating);
  const totalReviews = ratings.length;
  const averageRating =
    ratings.reduce((acc, rating) => acc + rating, 0) / totalReviews;

  product.rateAvg = averageRating;
  product.rateCount = totalReviews;

  await product.save();

  res.json({ message: "Review updated successfully!", product });
});

export const deleteReview = handleError(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(404).json({ message: "Product not found." });
  }

  const reviewIndex = product.reviews.findIndex(
    (r) => r.user.toString() === req.user._id.toString()
  );
  if (reviewIndex === -1) {
    return res.status(400).json({ message: "Review not found." });
  }

  product.reviews.splice(reviewIndex, 1);

  const ratings = product.reviews.map((review) => review.rating);
  const totalReviews = ratings.length;
  const averageRating =
    ratings.length > 0
      ? ratings.reduce((acc, rating) => acc + rating, 0) / totalReviews
      : 0;

  product.rateAvg = averageRating;
  product.rateCount = totalReviews;

  await product.save();

  res.json({ message: "Review deleted successfully.", product });
});
