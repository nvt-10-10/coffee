import { ValidationError } from "sequelize";
import Review from "../models/entities/Review.js";
import { handleValidationError } from "../utils/HandleValidationError.js";
import GenericService from "./GenericService.js";
import ResponseHandler from "../utils/ResponseHandler.js";
import ReviewRepository from "../repositories/ReviewRepository.js";

class ReviewService extends GenericService {
    constructor() {
        super(Review);
    }

    async getAllReviewByProduct(res, product_id) {
        try {
            const result = await ReviewRepository.getAllReviewByProduct(
                parseInt(product_id)
            );
            ResponseHandler.success(res, "Lấy dữ liệu thành công", result);
        } catch (error) {
            console.log(error);
            if (error instanceof ValidationError) {
                return ResponseHandler.error(
                    res,
                    handleValidationError(error.errors)
                );
            } else if (error.original && error.original.errno == 1452) {
                return ResponseHandler.error(
                    res,
                    `${error.fields} không tồn tại`
                );
            }
            ResponseHandler.error(res, "Xảy ra lỗi ở máy chủ");
        }
    }

    async getAllReviewByPage(res, page) {
        await this.getAllByPage(res, "base", page);
    }

    async getReviewById(res, id) {
        await this.getByIdRes(res, id, "base");
    }

    async createReview(res, ReviewData) {
        try {
            await this.create(ReviewData);
            ResponseHandler.success(res, "Tao Review thanh cong");
        } catch (error) {
            if (error instanceof ValidationError) {
                return ResponseHandler.error(
                    res,
                    handleValidationError(error.errors)
                );
            } else if (error.original && error.original.errno == 1452) {
                return ResponseHandler.error(
                    res,
                    `${error.fields} không tồn tại`
                );
            }
            ResponseHandler.error(res, "Xảy ra lỗi ở máy chủ");
        }
    }

    async updateReview(res, id, ReviewData) {
        await this.update(id, ReviewData, res);
    }

    async deleteReview(res, id) {
        await this.delete(id, res);
    }

    async filterReview(res, paginationParams) {
        await this.filter(res, paginationParams);
    }
}

export default new ReviewService();
