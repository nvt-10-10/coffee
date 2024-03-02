import GenericService from "./GenericService.js";
import PaymentMethod from "../models/entities/PaymentMethod.js";
import ResponseHandler from "../utils/ResponseHandler.js";
import { ValidationError } from "sequelize";
import { handleValidationError } from "../utils/HandleValidationError.js";
class PaymentMethodService extends GenericService {
    constructor() {
        super(PaymentMethod);
    }

    async getAllPaymentMethod(res) {
        await this.getAll(res, "base");
    }

    async getAllPaymentMethodByPage(res, page) {
        await this.getAllByPage(res, "base", page);
    }

    async getPaymentMethodById(res, id) {
        await this.getByIdRes(res, id, "base");
    }

    async createPaymentMethod(res, PaymentMethodData) {
        try {
            await this.create(PaymentMethodData);
            ResponseHandler.success(res, "Tao PaymentMethod thanh cong");
        } catch (error) {
            if (error instanceof ValidationError) {
                ResponseHandler.error(res, handleValidationError(error.errors));
                return;
            }
            ResponseHandler.error(res, "Xảy ra lỗi ở máy chủ");
        }
    }

    async updatePaymentMethod(res, id, PaymentMethodData) {
        try {
            await this.update(id, PaymentMethodData, res);
        } catch (error) {
            ResponseHandler.error(res, "Xảy ra lỗi ở máy chủ");
        }
    }

    async deletePaymentMethod(res, id) {
        await this.delete(id, res);
    }
}
export default new PaymentMethodService();
