import express from "express";
import RoleController from "../controllers/RoleController.js";
import roleValidate from "../validate/role.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();
router.get("", RoleController.getAllRole);
router.get("/:id", RoleController.getRoleById);
router.use(authMiddleware.adminMiddleware);
router.post("", roleValidate.validateRole, RoleController.createRole);
router.patch("", roleValidate.validateRole, RoleController.updateRole);
router.delete("/:id", RoleController.deleteRole);
export default router;
