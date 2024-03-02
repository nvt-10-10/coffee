import express from "express";
import CategoryController from "../controllers/CategoryController.js";

const router = express.Router();

router.get("", CategoryController.getAllCategory);
router.get("/page/:page", CategoryController.getAllCategoryByPage);
router.get("/:id", CategoryController.getCategoryById);
router.post("", CategoryController.createCategory);
router.patch("", CategoryController.updateCategory);
router.delete("/:id", CategoryController.deleteCategory);
export default router;
