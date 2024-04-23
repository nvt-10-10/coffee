import express from "express";
import ReviewController from "../controllers/ReviewController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/product/:id", ReviewController.getAllReviewByProduct);
router.get("/filter", ReviewController.getAllReviewByFilter);
router.get("/:id", ReviewController.getReviewById);
router.use(authMiddleware.authMiddleware);
router.delete("/:id", ReviewController.deleteReview);
router.post("", ReviewController.createReview);
router.patch("", ReviewController.updateReview);
export default router;
