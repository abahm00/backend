import express from "express";
import { dbConnection } from "./database/dbConnection.js";
import categoryRouter from "./src/modules/category/category.routes.js";
import { globalErrorHandling } from "./src/middlewares/globalErrorHandling.js";
import subCategoryRouter from "./src/modules/subCategory/subCategory.routes.js";
import brandRouter from "./src/modules/brand/brand.routes.js";
import productRouter from "./src/modules/product/product.routes.js";
import userRouter from "./src/modules/user/user.routes.js";
import authRouter from "./src/modules/auth/auth.routes.js";
import reviewRouter from "./src/modules/reviews/review.routes.js";
import wishListRouter from "./src/modules/wishlist/wishlist.routes.js";
import addressesRouter from "./src/modules/addresses/addresses.routes.js";
import couponRouter from "./src/modules/coupon/coupon.routes.js";
import cartRouter from "./src/modules/cart/cart.routes.js";
import orderRouter from "./src/modules/order/order.routes.js";
import cors from "cors";

export const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());
app.use("/category", categoryRouter);
app.use("/subCategory", subCategoryRouter);
app.use("/brand", brandRouter);
app.use("/product", productRouter);
app.use("/user", userRouter);
app.use("/auth", authRouter);
app.use("/review", reviewRouter);
app.use("/wishlist", wishListRouter);
app.use("/addresses", addressesRouter);
app.use("/coupon", couponRouter);
app.use("/cart", cartRouter);
app.use("/order", orderRouter);
app.use("/upload", express.static("upload"));
app.use("*", (req, res, next) => {
  const err = new Error("Route not found");
  err.statusCode = 404;
  next(err);
});

app.use(globalErrorHandling);

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
