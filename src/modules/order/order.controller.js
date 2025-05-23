import Stripe from "stripe";
import { Cart } from "../../../database/models/cart.model.js";
import { Order } from "../../../database/models/order.model.js";
import { Product } from "../../../database/models/product.model.js";
import { handleError } from "../../middlewares/catchError.js";

const stripe = new Stripe(
  "sk_test_51RRxy1RqLVMLDrLJWbMP46TBqP0YUd5h7LLmtHO3abmCoJ3dEPQbmO5p8b50RuQdos7Svvw62FhzT2Y4xwybGKdF00vAqGUdvi"
);

export const createCashOrder = handleError(async (req, res, next) => {
  // Populate product details for cart items
  let cart = await Cart.findById(req.params.id).populate("cartItems.product");
  if (!cart) {
    return next(new Error("Cart not found"));
  }

  let totalOrderPrice = cart.totalPriceAfterDiscount || cart.totalPrice;
  let order = new Order({
    user: req.user._id,
    orderItems: cart.cartItems,
    totalOrderPrice,
    shippingAddress: req.body.shippingAddress,
  });
  await order.save();

  // Prepare bulk update for stock and sold count
  let options = cart.cartItems.map((item) => {
    return {
      updateOne: {
        filter: { _id: item.product._id },
        update: {
          $inc: {
            stock: -item.quantity,
            sold: item.quantity,
          },
        },
      },
    };
  });

  await Product.bulkWrite(options);

  await Cart.findByIdAndDelete(cart._id);

  res.json({ message: "Order created", order });
});

export const createCheckoutSession = handleError(async (req, res, next) => {
  try {
    // Populate product details for cart items
    let cart = await Cart.findById(req.params.id).populate("cartItems.product");
    if (!cart) {
      return next(new Error("Cart not found"));
    }

    // Build Stripe line items
    const line_items = cart.cartItems.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.product.title || "Unnamed product",
        },
        unit_amount: Math.round((item.price || item.product.price) * 100),
      },
      quantity: item.quantity,
    }));

    // Convert shipping address values to strings for metadata
    let metadata = {};
    if (
      req.body.shippingAddress &&
      typeof req.body.shippingAddress === "object"
    ) {
      metadata = Object.fromEntries(
        Object.entries(req.body.shippingAddress).map(([key, value]) => [
          key,
          String(value),
        ])
      );
    }

    // Create Stripe checkout session
    let session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
      customer_email: req.user.email,
      client_reference_id: req.params.id,
      metadata,
    });

    res.json({ message: "Order created successfully", session });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    next(error);
  }
});

export const getOrderHistory = handleError(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id })
    .populate("orderItems.product")
    .sort({ createdAt: -1 });

  if (!orders.length) {
    return res.status(200).json({ message: "No orders found", orders: [] });
  }

  res.json({ results: orders.length, orders });
});
