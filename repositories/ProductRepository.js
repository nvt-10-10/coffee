import Product from "../models/entities/Product.js";

class ProductRepository {
    async getAllProductByCategory(category_id, page) {
        const data = await Product.findAll({
            where: {
                category_id,
            },
            limit: 10,
            offset: page * 10 - 1 > 0 ? page * 10 - 1 : 0,
        });
        data.findAndCountAll();
        return data;
    }
}
export default new ProductRepository();
