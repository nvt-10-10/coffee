import express from "express";
import RoleController from "../controllers/RoleController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import roleValidator from "../validator/role.js";
const router = express.Router();
router.get("", RoleController.getAllRole);
router.get("/:id", RoleController.getRoleById);
// router.use(authMiddleware.adminMiddleware);
router.post("", roleValidator.validatorRoleCreate, RoleController.createRole);
router.patch("", roleValidator.validatorRoleUpdate, RoleController.updateRole);
router.delete(
    "/:id",
    roleValidator.validatorRoleDelete,
    RoleController.deleteRole
);
export default router;
