import express from "express";
import AuthController from "../controllers/AuthController.js";
import authValidate from "../validate/auth.js";
const router = express.Router();

router.get("/refreshToken", AuthController.refreshToken);
router.get("/logout", AuthController.logout);
router.post("/login", authValidate.validateLogin, AuthController.login);
router.post(
    "/register",
    authValidate.validateRegister,
    AuthController.register
);
export default router;
