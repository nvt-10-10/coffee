import { ValidationError } from "sequelize";
import Product from "../models/entities/Product.js";
import { handleValidationError } from "../utils/HandleValidationError.js";
import GenericService from "./GenericService.js";
import ResponseHandler from "../utils/ResponseHandler.js";
import ProductRepository from "../repositories/ProductRepository.js";
import UploadService from "./UploadService.js";

class ProductService extends GenericService {
    constructor() {
        super(Product);
    }

    async getAllProduct(res) {
        await this.getAll(res, "base");
    }

    async getAllProductByCategory(res, category_id, page = 0) {
        try {
            const data = await ProductRepository.getAllProductByCategory(
                category_id,
                page
            );
            ResponseHandler.success(res, "Lấy dữ liệu thành công", data);
        } catch (error) {
            ResponseHandler.error(res, "Xảy ra lỗi ở máy chủ");
        }
    }

    async getAllProductByPage(res, page) {
        await this.getAllByPage(res, "base", page);
    }

    async getProductById(res, id) {
        await this.getByIdRes(res, id, "base");
    }

    async createProduct(res, ProductData, file = null) {
        try {
            if (file) {
                const uploadService = new UploadService("upload/products");
                ProductData.img = await uploadService.saveFile(
                    file,
                    "remove_bg"
                );
            }
            await this.create(ProductData);
            ResponseHandler.success(res, "Tao Product thanh cong");
        } catch (error) {
            console.log(error);
            if (error instanceof ValidationError) {
                ResponseHandler.error(res, handleValidationError(error.errors));
                return;
            }
            ResponseHandler.error(res, "Xảy ra lỗi ở máy chủ");
        }
    }

    async updateProduct(res, id, ProductData, file = null) {
        try {
            const item = await this.getById(id);
            if (!item) {
                ResponseHandler.error(res, `${this.model.name} không tìm thấy`);
                throw new Error();
            } else {
                if (file) {
                    const uploadService = new UploadService("upload/products");
                    console.log("abc" + item.img);
                    await uploadService.deleteFile(item.img);
                    ProductData.img = await uploadService.saveFile(
                        file,
                        "remove_bg"
                    );
                }
                await item.update(ProductData);
                ResponseHandler.success(
                    res,
                    `${this.model.name} cập nhật thành công`
                );
            }
        } catch (error) {
            console.log(error);
            ResponseHandler.error(res, "Xảy ra lỗi ở máy chủ");
        }
    }

    async deleteProduct(res, id) {
        await this.delete(id, res);
    }

    async filterProduct(res, paginationParams) {
        await this.filter(res, paginationParams);
    }
}

export default new ProductService();
