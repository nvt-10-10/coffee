import express from "express";
import AuthController from "../controllers/AuthController.js";
import authValidate from "../validate/auth.js";
const router = express.Router();

router.get("/refreshToken", AuthController.refreshToken);
router.get("/logout", AuthController.logout);
router.post("/login", authValidate.validatorLogin, AuthController.login);
router.post(
    "/register",
    authValidate.validatorRegister,
    AuthController.register
);
export default router;
