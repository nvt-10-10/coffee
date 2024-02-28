import RoleService from "../services/RoleService.js";
class RoleController {
    async getAllRole(req, res) {
        await RoleService.getAllRoles(res);
    }

    async getRoleById(req, res) {
        const id = req.params.id;
        await RoleService.getRoleById(res, id);
    }

    async createRole(req, res) {
        const { name } = req.body;
        await RoleService.createRole(res, { name });
    }

    async updateRole(req, res) {
        const { id, name } = req.body;
        await RoleService.updateRole(res, id, { id, name });
    }

    async deleteRole(req, res) {
        const id = req.params.id;
        await RoleService.deleteRole(res, id);
    }
}

export default new RoleController();
