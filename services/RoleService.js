import { ValidationError } from "sequelize";
import Role from "../models/entities/Role.js";
import ResponseHandler from "../utils/ResponseHandler.js";
import GenericService from "./GenericService.js";
import { handleValidationError } from "../utils/HandleValidationError.js";
class RoleService extends GenericService {
    constructor() {
        super(Role);
    }
    async getAllRoles(res) {
        await this.getAll(res, "base");
    }

    async getRoleById(res, id) {
        await this.getByIdRes(res, id, "base");
    }

    async createRole(res, roleData) {
        try {
            await this.create(roleData);
            ResponseHandler.success(res, "Tao Role thanh cong");
        } catch (error) {
            if (error instanceof ValidationError) {
                ResponseHandler.error(res, handleValidationError(error.errors));
                return;
            }
            ResponseHandler.error(res, "Xảy ra lỗi ở máy chủ");
        }
    }

    async updateRole(res, id, roleData) {
        try {
            await this.update(id, roleData, res);
        } catch (error) {
            error;
            ResponseHandler.error(res, "Xảy ra lỗi ở máy chủ");
        }
    }

    async deleteRole(res, id) {
        await this.delete(id, res);
    }
}
export default new RoleService();
