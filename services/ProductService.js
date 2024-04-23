import { Op, ValidationError, where } from "sequelize";
import Product from "../models/entities/Product.js";
import { handleValidationError } from "../utils/HandleValidationError.js";
import GenericService from "./GenericService.js";
import ResponseHandler from "../utils/ResponseHandler.js";
import ProductRepository from "../repositories/ProductRepository.js";
import UploadService from "./UploadService.js";
import PaginatePaginate from "../models/PaginatePaginate.js";
import Category from "../models/entities/Category.js";

class ProductService extends GenericService {
    constructor() {
        super(Product);
    }

    async getAllProduct(res) {
        await this.getAll(res, "base");
    }

    async getAllProductByCategory(res, id, product_id) {
        try {
            const data = await Product.scope(["base", "detail"]).findAll({
                where: {
                    id: { [Op.ne]: product_id },
                },
                include: {
                    model: Category,
                    attributes: ["name"],
                    where: {
                        id: id,
                    },
                },
            });

            ResponseHandler.success(res, "Lấy dữ liệu thành công", data);
        } catch (error) {
            console.log(error);
            ResponseHandler.error(res, "Xảy ra lỗi ở máy chủ");
        }
    }

    async getFilter(res, search, category_id, page = 0, price = 10000000) {
        try {
            const { results, count } = await ProductRepository.getFilter(
                search,
                category_id,
                page,
                price
            );
            let data = new PaginatePaginate(results, count, page).get();
            const maxPrice = await Product.max("price");
            data.maxPrice = maxPrice;
            ResponseHandler.success(res, "Lấy dữ liệu thành công", data);
        } catch (error) {
            console.log(error);
            ResponseHandler.error(res, "Xảy ra lỗi ở máy chủ");
        }
    }

    async getAllProductByPage(res, page) {
        await this.getAllByPage(res, page, "base");
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
            console.log(error);
            ResponseHandler.error(res, "Xảy ra lỗi ở máy chủ");
        }
    }

    async createProduct(res, ProductData, file = null) {
        try {
            console.log(ProductData);
            if (file) {
                const uploadService = new UploadService("products");
                ProductData.img = await uploadService.saveFile(file);
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
            console.log(ProductData, file);

            const item = await this.getById(id);
            if (!item) {
                ResponseHandler.error(res, `${this.model.name} không tìm thấy`);
                throw new Error();
            } else {
                if (file) {
                    const uploadService = new UploadService("products");
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
}

export default new ProductService();
