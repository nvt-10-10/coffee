import express from "express";
import UserController from "../controllers/UserController.js";
import handleImageUpload from "../middleware/handleImageUpload.js";

const router = express.Router();

router.get("", UserController.getAllUser);
router.get("/page/:page", UserController.getAllUserByPage);
router.get("/:id", UserController.getUserById);
router.post("", UserController.createUser);

router.patch("", handleImageUpload, UserController.updateUser);
router.delete("/:id", UserController.deleteUser);
export default router;
