import express from "express";
import PaymentMethodController from "../controllers/PaymentMethodController.js";

const router = express.Router();

router.get("", PaymentMethodController.getAllPaymentMethod);
router.get("/page/:page", PaymentMethodController.getAllPaymentMethodByPage);
router.get("/:id", PaymentMethodController.getPaymentMethodById);
router.post("", PaymentMethodController.createPaymentMethod);
router.patch("", PaymentMethodController.updatePaymentMethod);
router.delete("/:id", PaymentMethodController.deletePaymentMethod);
export default router;
