import ReviewService from "../services/ReviewService.js";
class ReviewController {
    async getAllReviewByFilter(req, res) {
        const { page, size, sort } = req.query;
        await ReviewService.filterReview(res, { page, size, sort });
    }

    async getAllReviewByProduct(req, res) {
        const id = req.params.id;
        await ReviewService.getAllReviewByProduct(res, id);
    }

    async getReviewById(req, res) {
        const id = req.params.id;
        await ReviewService.getReviewById(res, id);
    }

    async createReview(req, res) {
        const { product_id, star, content, order_id } = req.body;
        const user_id = req.user.id;
        await ReviewService.createReview(res, {
            product_id,
            user_id,
            star,
            content,
        });
    }

    async updateReview(req, res) {
        const { id, product_id, user_id, star, content } = req.body;
        await ReviewService.updateReview(res, id, {
            id,
            product_id,
            user_id,
            star,
            content,
        });
    }

    async deleteReview(req, res) {
        const id = req.params.id;
        await ReviewService.deleteReview(res, id);
    }
}

export default new ReviewController();
