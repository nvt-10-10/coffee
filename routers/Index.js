import RoleRouter from "./Role.js";
import UserRouter from "./User.js";
import CategoryRouter from "./Category.js";
import PaymentMethodRouter from "./PaymentMethod.js";
import ProductRouter from "./Product.js";
import ReviewRouter from "./Review.js";
import AuthRouter from "./Auth.js";
import express from "express";

const router = express.Router();
router.use("/api/auth", AuthRouter);
router.use("/api/roles", RoleRouter);
router.use("/api/users", UserRouter);
router.use("/api/categories", CategoryRouter);
router.use("/api/paymentmethods", PaymentMethodRouter);
router.use("/api/products", ProductRouter);
router.use("/api/reviews", ReviewRouter);
export default router;
