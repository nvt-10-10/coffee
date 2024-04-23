import express from "express";
import CartController from "../controllers/CartController.js";

import authMiddleware from "../middleware/authMiddleware.js";
const router = express.Router();

router.use(authMiddleware.authMiddleware);
router.get("", CartController.getAll);

router.post("", CartController.createCart);
router.patch("", CartController.updateCart);
router.delete("/:id", CartController.deleteCart);
export default router;
