import GenericService from "./GenericService.js";
import User from "../models/entities/User.js";
import ResponseHandler from "../utils/ResponseHandler.js";
import { comparePassword, hashPassword } from "../utils/bcryptUtils.js";
import { ValidationError, where } from "sequelize";
import { handleValidationError } from "../utils/HandleValidationError.js";
import Role from "../models/entities/Role.js";
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
        await this.getByIdRes(res, id, "base");
    }

    async createUser(res, userData) {
        try {
            if (!userData.role_id) {
                const role = await Role.findOne({
                    where: {
                        name: "Người dùng ",
                    },
                });
                userData.role_id = role.id;
            }
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

    async updateUser(res, id, userData, file = null) {
        try {
            const user = await this.getById(id);
            if (user) {
                if (userData.password) {
                    if (
                        await comparePassword(userData.password, user.password)
                    ) {
                        return ResponseHandler.error(
                            res,
                            "Đã trùng mật khẩu cũ",
                            409
                        );
                    }
                    userData.password = await hashPassword(userData.password);
                }
                if (file) {
                    const uploadService = new UploadService("upload/users");
                    await uploadService.deleteFile(user.avatar);
                    userData.avatar = await uploadService.saveFile(file);
                }
                await user.update(userData);
                ResponseHandler.success(res, `Users cập nhật thành công`);
            } else {
                ResponseHandler.error(res, `Users không tìm thấy`);
            }
        } catch (error) {
            ResponseHandler.error(res, "Xảy ra lỗi ở máy chủ");
        }
    }

    async deleteUser(res, id) {
        await this.delete(id, res);
    }
}
export default new UserService();
