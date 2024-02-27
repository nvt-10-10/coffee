import GenericService from "./GenericService";
import User from "../models/entities/User";
import UserRespository from "../repositories/UserRespository";
import ResponseHandler from "../utils/ResponseHandler";
import { hashPassword } from "../utils/bcryptUtils";
class UserService extends GenericService {
    constructor() {
        super(User);
    }

    async getAllUserByPage(res, page) {
        await this.getAllByPage(res, page);
    }

    async getUserById(res, id) {
        await this.getById(res, id);
    }

    async createUser(res, userData) {
        try {
            if (UserRespository.checkUserName(userData.username)) {
                ResponseHandler.error(res, "Username đã tồn tại", 404);
            } else {
                userData.password = hashPassword(userData.password);
                this.create(userData);
                ResponseHandler.success(res, "Tạo tài khoản thành công", 404);
            }
        } catch (error) {
            ResponseHandler.error(res, "Xảy ra lỗi ở máy chủ");
        }
    }
}
export default new UserService();
