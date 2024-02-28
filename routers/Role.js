import express from "express";
import RoleController from "../controllers/RoleController.js";

const router = express.Router();

router.get("", RoleController.getAllRole);
router.get("/:id", RoleController.getRoleById);
router.post("", RoleController.createRole);
router.patch("", RoleController.updateRole);
router.delete("/:id", RoleController.deleteRole);
export default router;
