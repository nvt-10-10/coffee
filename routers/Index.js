import RoleRouter from "./Role.js";
import UserRouter from "./User.js";
import StaffRouter from "./Staff.js";
import CategoryRouter from "./Category.js";
import PaymentMethodRouter from "./PaymentMethod.js";
import ProductRouter from "./Product.js";
import ReviewRouter from "./Review.js";
import AuthRouter from "./Auth.js";
import CartRouter from "./Cart.js";
import OrderRouter from "./Order.js";
import StatisticalRouter from "./Statistical.js";
import express from "express";

import encodeImageToBase64 from "../utils/encodeImageToBase64.js";

const router = express.Router();

router.get("/api/file", (req, res) => {
    const { fileName } = req.query;
    encodeImageToBase64(fileName, res);
});
router.use("/api/auth", AuthRouter);
router.use("/api/roles", RoleRouter);
router.use("/api/users", UserRouter);
router.use("/api/staffs", StaffRouter);
router.use("/api/categories", CategoryRouter);
router.use("/api/paymentMethods", PaymentMethodRouter);
router.use("/api/products", ProductRouter);
router.use("/api/reviews", ReviewRouter);
router.use("/api/carts", CartRouter);
router.use("/api/orders", OrderRouter);
router.use("/api/statistical", StatisticalRouter);
export default router;
