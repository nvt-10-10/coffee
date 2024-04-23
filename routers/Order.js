import express from "express";
import OrderController from "../controllers/OrderController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import { validatorCreate } from "../validator/order.js";
const router = express.Router();

router.use(authMiddleware.authMiddleware);
router.get("", OrderController.getAll);
router.get("/user/:id", OrderController.getAllByUser);
router.get("/:id", OrderController.getOrderDetailByID);
router.post("", validatorCreate, OrderController.createOrder);
router.patch("/updateReview", OrderController.updateReview);
router.patch("", OrderController.updateOrder);
router.delete("/:id", OrderController.deleteOrder);
export default router;
