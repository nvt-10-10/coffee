import express from "express";
import ProductController from "../controllers/ProductController.js";
import handleImageUpload from "../middleware/handleImageUpload.js";

const router = express.Router();

router.get("", ProductController.getAllProduct);
router.get("/page/:page", ProductController.getAllProductByPage);
router.get("/category/page/:page", ProductController.getAllProductByPage);
router.get("/filter", ProductController.getAllProductByFilter);

router.get("/page/:page", ProductController.getAllProductByPage);
router.get("/:id", ProductController.getProductById);
router.delete("/:id", ProductController.deleteProduct);
// router.post("", ProductController.createProduct);

router.post("", handleImageUpload, ProductController.createProduct);
router.patch("", handleImageUpload, ProductController.updateProduct);
export default router;
