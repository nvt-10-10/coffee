import Role from "../models/entities/Role.js";
import RoleRespository from "../repositories/RoleRepository.js";
import ResponseHandler from "../utils/ResponseHandler.js";
import GenericService from "./GenericService.js";
class RoleService extends GenericService {
    constructor() {
        super(Role);
    }
    async getAllRoles(res) {
        await this.getAll(res, "base");
    }

    async getRoleById(res, id) {
        console.log(id);
        await this.getByIdRes(res, id, "base");
    }

    async createRole(res, roleData) {
        try {
            if (await RoleRespository.checkName(roleData.name)) {
                await this.create(roleData);
                ResponseHandler.success(res, "Tao Role thanh cong");
            } else {
                ResponseHandler.error(res, "Quyền đã tồn tại", 404);
            }
        } catch (error) {
            ResponseHandler.error(res, "Xảy ra lỗi ở máy chủ");
        }
    }

    async updateRole(res, id, roleData) {
        try {
            console.log(`id: ${id} data ${roleData} res: ${res}`);
            await this.update(id, roleData, res);
        } catch (error) {
            console.log(error);
            ResponseHandler.error(res, "Xảy ra lỗi ở máy chủ");
        }
    }

    async deleteRole(res, id) {
        await this.delete(id, res);
    }
}
export default new RoleService();
