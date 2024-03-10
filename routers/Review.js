import express from "express";
import ReviewController from "../controllers/ReviewController.js";

const router = express.Router();

router.get("/product/:id", ReviewController.getAllReviewByProduct);
router.get("/filter", ReviewController.getAllReviewByFilter);
router.get("/:id", ReviewController.getReviewById);
router.delete("/:id", ReviewController.deleteReview);
router.post("", ReviewController.createReview);
router.patch("", ReviewController.updateReview); // Sửa lại route và thêm id parameter
export default router;
