import express from "express";
import ProductController from "../controllers/ProductController.js";
import handleImageUpload from "../middleware/handleImageUpload.js";
import authMiddleware from "../middleware/authMiddleware.js";
import productValidator from "../validator/product.js";

const router = express.Router();

router.get("", ProductController.getAllProduct);
router.get(
    "/:product_id/category/:id",
    ProductController.getAllProductCategory
);
router.get("/filter", ProductController.getFilter);
router.get(
    "/:id",
    productValidator.validatorProductQuery,
    ProductController.getProductById
);
router.get("/detail/:id", ProductController.getProductDetailById);
router.use(authMiddleware.staffMiddleware);
router.delete("/:id", ProductController.deleteProduct);
router.post("", handleImageUpload, ProductController.createProduct);
router.patch("", handleImageUpload, ProductController.updateProduct);
export default router;
