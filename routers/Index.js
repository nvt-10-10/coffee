import RoleRouter from "./Role.js";
import express from "express";

const router = express.Router();
router.use("/api/roles", RoleRouter);
export default router;
