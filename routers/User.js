import express from "express";
import UserController from "../controllers/UserController.js";
import handleImageUpload from "../middleware/handleImageUpload.js";
import authMiddleware from "../middleware/authMiddleware.js";
import userValidator from "../validator/user.js";

const router = express.Router();

router.get("", UserController.getAllUser);
router.get("/page/:page", UserController.getAllUserByPage);
router.get("/:id", UserController.getUserById);
router.use(authMiddleware.authMiddleware);
router.patch(
    "",
    userValidator.validatorUserUpdate,
    handleImageUpload,
    UserController.updateUser
);
router.delete("/:id", UserController.deleteUser);
export default router;
