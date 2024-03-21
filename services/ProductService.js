import { ValidationError } from "sequelize";
import Product from "../models/entities/Product.js";
import { handleValidationError } from "../utils/HandleValidationError.js";
import GenericService from "./GenericService.js";
import ResponseHandler from "../utils/ResponseHandler.js";
import ProductRepository from "../repositories/ProductRepository.js";
import UploadService from "./UploadService.js";
import PaginatePaginate from "../models/PaginatePaginate.js";

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

    async getProductDetailById(res, id) {
        try {
            const data = await this.getById(id, ["base", "detail"]);
            if (data) {
                ResponseHandler.success(res, "Lấy dữ liệu thành công", data);
            } else {
                ResponseHandler.error(res, "Sản phẩm không tồn tại");
            }
        } catch (error) {
            ResponseHandler.error(res, "Xảy ra lỗi ở máy chủ");
        }
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
                    if (ProductData.img)
                        await uploadService.deleteFile(item.img);
                    ProductData.img = await uploadService.saveFile(file);
                }
                await item.update(ProductData);
                ResponseHandler.success(
                    res,
                    `${this.model.name} cập nhật thành công`
                );
            }
        } catch (error) {
            ResponseHandler.error(res, "Xảy ra lỗi ở máy chủ");
        }
    }

    async deleteProduct(res, id) {
        await this.delete(id, res);
    }

    async filterProduct(res, paginationParams) {
        await this.filter(res, paginationParams);
    }

    async getAllAndFilter(res, filter, size = 9) {
        try {
            const { page, price, category_id } = filter;
            console.log(filter);
            const result = await ProductRepository.getAllProductByCategories(
                category_id,
                price,
                page,
                size
            );

            const data = new PaginatePaginate(
                result.results,
                result.total[0].total,
                page,
                size
            ).get();
            ResponseHandler.success(res, `Lấy dữ liệu thành công `, data);
        } catch (error) {
            console.log(error);
        }
    }
}

export default new ProductService();
