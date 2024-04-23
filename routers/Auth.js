import express from "express";
import AuthController from "../controllers/AuthController.js";
import authValidator from "../validator/auth.js";
const router = express.Router();
router.post("/forgotPassword", AuthController.forgotPassword);
router.get("/refreshToken", AuthController.refreshToken);
router.get("/logout", AuthController.logout);
router.post("/login", authValidator.validatorLogin, AuthController.login);
router.post(
    "/register",
    authValidator.validatorRegister,
    AuthController.register
);
export default router;
