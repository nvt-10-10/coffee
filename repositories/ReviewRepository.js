import Review from "../models/entities/Review.js";

class ReviewRepository {
    async getAllReviewByProduct(product_id, page = 0) {
        const { rows, count } = await Review.scope("base").findAndCountAll({
            where: {
                product_id,
            },
            limit: 10,
            offset: page * 10 - 1 > 0 ? page * 10 - 1 : 0,
        });
        return rows;
    }
}

export default new ReviewRepository();
