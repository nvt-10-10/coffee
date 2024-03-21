import express from "express";
import ProductController from "../controllers/ProductController.js";
import handleImageUpload from "../middleware/handleImageUpload.js";
import authMiddleware from "../middleware/authMiddleware.js";
import productValidator from "../validator/product.js";

const router = express.Router();

router.get("", ProductController.getAllProduct);
router.get(
    "/test",
    productValidator.validatorProductQuery,
    ProductController.test
);
router.post("/test2", ProductController.getAllProductByCategory);
router.get("/page/:page", ProductController.getAllProductByPage);
router.get("/category/page/:page", ProductController.getAllProductByPage);
router.get("/filter", ProductController.getAllProductByFilter);
router.get("/page/:page", ProductController.getAllProductByPage);
router.get(
    "/:id",
    productValidator.validatorProductQuery,
    ProductController.getProductById
);
router.get("/detail/:id", ProductController.getProductDetailById);
router.delete("/:id", ProductController.deleteProduct);
router.post("", handleImageUpload, ProductController.createProduct);
router.patch("", handleImageUpload, ProductController.updateProduct);
router.use(authMiddleware.staffMiddleware);
export default router;
