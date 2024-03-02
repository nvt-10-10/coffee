import GenericService from "./GenericService.js";
import User from "../models/entities/User.js";
import ResponseHandler from "../utils/ResponseHandler.js";
import { comparePassword, hashPassword } from "../utils/bcryptUtils.js";
import { ValidationError } from "sequelize";
import { handleValidationError } from "../utils/HandleValidationError.js";
class UserService extends GenericService {
    constructor() {
        super(User);
    }

    async getAllUser(res) {
        await this.getAll(res);
    }

    async getAllUserByPage(res, page) {
        await this.getAllByPage(res, page);
    }

    async getUserById(res, id) {
        await this.getByIdRes(res, id);
    }

    async createUser(res, userData) {
        try {
            if (!userData.role_id) userData.role_id = 1;
            userData.password = await hashPassword(userData.password);
            await this.create(userData);
            ResponseHandler.success(res, "Tạo tài khoản thành công");
        } catch (error) {
            if (error instanceof ValidationError) {
                ResponseHandler.error(res, handleValidationError(error.errors));
                return;
            }
            ResponseHandler.error(res, "Xảy ra lỗi ở máy chủ");
        }
    }

    async updateUser(res, id, userData) {
        try {
            const user = await this.getById(id);
            if (user) {
                if (userData.password) {
                    if (await comparePassword(password, user.password)) {
                        return ResponseHandler.error(
                            res,
                            "Đã trùng mật khẩu cũ",
                            409
                        );
                    }
                    userData.password = await hashPassword(userData.password);
                }
                console.log("chay", userData);
                const newUser = await user.update(userData);
                console.log("chay roi", newUser);
                ResponseHandler.success(res, `Users cập nhật thành công`);
            } else {
                ResponseHandler.error(res, `Users không tìm thấy`);
            }
        } catch (error) {
            console.log(error);
            ResponseHandler.error(res, "Xảy ra lỗi ở máy chủ");
        }
    }

    async deleteUser(res, id) {
        await this.delete(id, res);
    }
}
export default new UserService();
