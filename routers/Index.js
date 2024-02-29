import RoleRouter from "./Role.js";
import UserRouter from "./User.js";
import express from "express";

const router = express.Router();
router.use("/api/roles", RoleRouter);
router.use("/api/users", UserRouter);
export default router;
