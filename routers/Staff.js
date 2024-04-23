import express from "express";
import UserController from "../controllers/UserController.js";
import handleImageUpload from "../middleware/handleImageUpload.js";
import authMiddleware from "../middleware/authMiddleware.js";
import userValidator from "../validator/user.js";

const router = express.Router();

router.use(authMiddleware.adminMiddleware);
router.get("/page/:page", UserController.getAllUserByPage);
router.get("", UserController.getAllStaff);
router.get("/:id", UserController.getUserById);
router.get("/detail/:id", UserController.getUserDetailById);
router.post("", handleImageUpload, UserController.createUser);
router.patch(
    "",
    userValidator.validatorUserUpdate,
    handleImageUpload,
    UserController.updateUser
);
router.delete("/:id", UserController.deleteUser);
export default router;
