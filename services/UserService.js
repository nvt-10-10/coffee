import GenericService from "./GenericService.js";
import User from "../models/entities/User.js";
import ResponseHandler from "../utils/ResponseHandler.js";
import { comparePassword, hashPassword } from "../utils/bcryptUtils.js";
import UploadService from "./UploadService.js";
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
                    if (user.avatar)
                        await uploadService.deleteFile(user.avatar);
                    userData.avatar = await uploadService.saveFile(file);
                }
                await user.update(userData);
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
