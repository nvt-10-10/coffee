import express from "express";
import UserController from "../controllers/UserController.js";
import handleImageUpload from "../middleware/handleImageUpload.js";
import authMiddleware from "../middleware/authMiddleware.js";
import userValidator from "../validator/user.js";

const router = express.Router();

router.get("/page/:page", UserController.getAllUserByPage);
router.get("/:id", UserController.getUserById);
router.use(authMiddleware.authMiddleware);
router.get("/detail/:id", UserController.getUserDetailById);
router.patch(
    "",
    authMiddleware.authMiddleware,
    userValidator.validatorUserUpdate,
    handleImageUpload,
    UserController.updateUser
);
router.use(authMiddleware.adminMiddleware);
router.get("", UserController.getAllUser);
router.post("", handleImageUpload, UserController.createUser);

router.delete("/:id", UserController.deleteUser);
export default router;
