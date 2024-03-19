import express from "express";
import CategoryController from "../controllers/CategoryController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import categoryValidator from "../validate/category.js";

const router = express.Router();

router.get("", CategoryController.getAllCategory);
router.get("/page/:page", CategoryController.getAllCategoryByPage);
router.get("/:id", CategoryController.getCategoryById);
router.use(authMiddleware.adminMiddleware);
router.post(
    "",
    categoryValidator.validatorCategoryCreate,
    CategoryController.createCategory
);
router.patch(
    "",
    categoryValidator.validatorCategoryUpdate,
    CategoryController.updateCategory
);
router.delete(
    "/:id",
    categoryValidator.validatorCategoryDelete,
    CategoryController.deleteCategory
);
export default router;
