import express from "express";
import AuthController from "../controllers/AuthController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import authValidate from "../validate/auth.js";
const router = express.Router();

router.get("/refreshToken", AuthController.refreshToken);
router.get("/logout", AuthController.logout);
router.post(
    "/login",
    authValidate.validateLogin,
    authMiddleware.loginMiddleware,
    AuthController.login
);
router.post(
    "/register",
    authValidate.validateRegister,
    authMiddleware.loginMiddleware,
    AuthController.register
);
export default router;
