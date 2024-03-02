import { ValidationError } from "sequelize";
import Category from "../models/entities/Category.js";
import { handleValidationError } from "../utils/HandleValidationError.js";
import GenericService from "./GenericService.js";
import ResponseHandler from "../utils/ResponseHandler.js";

class CategoryService extends GenericService {
    constructor() {
        super(Category);
    }

    async getAllCategories(res) {
        await this.getAll(res, "base");
    }

    async getAllCategoriesByPage(res, page) {
        await this.getAllByPage(res, "base", page);
    }

    async getCategoryById(res, id) {
        await this.getByIdRes(res, id, "base");
    }

    async createCategory(res, CategoryData) {
        try {
            await this.create(CategoryData);
            ResponseHandler.success(res, "Tao Category thanh cong");
        } catch (error) {
            if (error instanceof ValidationError) {
                ResponseHandler.error(res, handleValidationError(error.errors));
                return;
            }
            ResponseHandler.error(res, "Xảy ra lỗi ở máy chủ");
        }
    }

    async updateCategory(res, id, CategoryData) {
        try {
            await this.update(id, CategoryData, res);
        } catch (error) {
            ResponseHandler.error(res, "Xảy ra lỗi ở máy chủ");
        }
    }

    async deleteCategory(res, id) {
        await this.delete(id, res);
    }
}

export default new CategoryService();
