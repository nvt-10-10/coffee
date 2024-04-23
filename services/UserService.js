import GenericService from "./GenericService.js";
import User from "../models/entities/User.js";
import ResponseHandler from "../utils/ResponseHandler.js";
import { comparePassword, hashPassword } from "../utils/bcryptUtils.js";
import UploadService from "./UploadService.js";
import Role from "../models/entities/Role.js";
import { ValidationError } from "sequelize";
import { handleValidationError } from "../utils/HandleValidationError.js";

class UserService extends GenericService {
    constructor() {
        super(User);
    }

    async getAllUser(res) {
        await this.getAll(res);
    }

    async getAllStaff(res) {
        try {
            let result;
            result = await this.model.scope(["base", "detail"]).findAll({
                include: [
                    {
                        model: Role,
                        where: {
                            id: 2,
                        },
                    },
                    {
                        model: Role,
                        attributes: ["id"],
                    },
                ],
            });

            ResponseHandler.success(
                res,
                "Lấy dữ liệu thành công nhan vien",
                result
            );
        } catch (error) {
            console.log(error);
            ResponseHandler.error(res, "Xảy ra lỗi ở máy chủ");
        }
    }

    async getAllUser(res) {
        try {
            let result;
            result = await this.model.scope(["base", "detail"]).findAll({
                include: [
                    {
                        model: Role,
                        where: {
                            id: 1,
                        },
                    },
                    {
                        model: Role,
                        attributes: ["id"],
                    },
                ],
            });

            ResponseHandler.success(
                res,
                "Lấy dữ liệu thành công nhan vien",
                result
            );
        } catch (error) {
            console.log(error);
            ResponseHandler.error(res, "Xảy ra lỗi ở máy chủ");
        }
    }

    async getAllUserByPage(res, page) {
        await this.getAllByPage(res, page);
    }

    async getUserById(res, id) {
        await this.getByIdRes(res, id, "base");
    }

    async getUserDetailById(res, id) {
        try {
            let result;
            result = await this.model
                .scope(["base", "detail", "username"])
                .findOne({ where: { id: id } });

            ResponseHandler.success(res, "Lấy dữ liệu thành công", result);
        } catch (error) {
            console.log(error);
            ResponseHandler.error(res, "Xảy ra lỗi ở máy chủ");
        }
    }

    async register(res, userData) {
        try {
            if (!userData?.role_id) {
                const role = await Role.findOne({
                    where: {
                        name: "Người dùng",
                    },
                });
                userData.role_id = role.id;
            }
            userData.password = await hashPassword(userData.password);
            await User.create(userData);
            ResponseHandler.success(res, "Tạo tài khoản thành công");
        } catch (error) {
            if (error instanceof ValidationError) {
                ResponseHandler.error(res, handleValidationError(error.errors));
                return;
            }
            ResponseHandler.error(res, "Xảy ra lỗi ở máy chủ");
        }
    }
    async createUser(res, userData, file = null) {
        try {
            console.log(userData);
            if (file) {
                const uploadService = new UploadService("avatars");
                userData.avatar = await uploadService.saveFile(file);
            }
            userData.password = await hashPassword(userData.password);
            await User.create(userData);
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
                    const uploadService = new UploadService("avatars");
                    if (user.avatar)
                        await uploadService.deleteFile(user.avatar);
                    userData.avatar = await uploadService.saveFile(file);
                }
                const userRes = await user.update(userData);
                ResponseHandler.success(res, `Users cập nhật thành công`, {
                    avatar: userRes.avatar,
                });
            } else {
                ResponseHandler.error(res, `Users không tìm thấy`);
            }
        } catch (error) {
            if (error instanceof ValidationError) {
                ResponseHandler.error(res, handleValidationError(error.errors));
                return;
            } else ResponseHandler.error(res, "Xảy ra lỗi ở máy chủ");
        }
    }

    async deleteUser(res, id) {
        await this.delete(id, res);
    }
}
export default new UserService();
