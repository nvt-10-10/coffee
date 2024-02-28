import Role from "../models/entities/Role.js";
import RoleRespository from "../repositories/RoleRespository.js";
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

    async createRole(res, RoleData) {
        try {
            if (await RoleRespository.checkName(RoleData.name)) {
                await this.create(RoleData);
                ResponseHandler.success(res, "Tao Role thanh cong");
            } else {
                ResponseHandler.error(res, "Quyền đã tồn tại", 404);
            }
        } catch (error) {
            ResponseHandler.error(res, "Xảy ra lỗi ở máy chủ");
        }
    }

    async updateRole(res, id, RoleData) {
        try {
            console.log(`id: ${id} data ${RoleData} res: ${res}`);
            await this.update(id, RoleData, res);
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
