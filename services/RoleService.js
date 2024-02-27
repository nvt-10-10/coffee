import { error } from "console";
import Role from "../models/entities/Role";
import ResponseHandler from "../utils/ResponseHandler";
class RoleService {
    async getAllRoles(res) {
        try {
            const result = await Role.findAll();
            ResponseHandler.success(res, "Lay du lieu thanh cong", result);
        } catch (error) {
            ResponseHandler.error(res, "Xảy ra lỗi ở máy chủ");
        }
    }

    async getRoleById(res, id) {
        try {
            const role = Role.findByPk(id);
            if (role)
                ResponseHandler.success(res, "Lay du lieu thanh cong", role);
            else ResponseHandler.error(error, "Khong ton tai role ");
        } catch (error) {
            ResponseHandler.error(res, "Xảy ra lỗi ở máy chủ");
        }
    }
}
export default new RoleService();
