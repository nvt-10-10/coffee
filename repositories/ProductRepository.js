import Product from "../models/entities/Product.js";
import { Op, literal } from "sequelize";
import Category from "../models/entities/Category.js";

class ProductRepository {
    async getFilter(
        search,
        category_id,
        page = 0,
        price = 10000000000,
        limit = 9
    ) {
        try {
            let whereCondition = {};

            if (category_id && search) {
                whereCondition = {
                    [Op.and]: [
                        { category_id },
                        literal(
                            `LOWER(products.name) LIKE LOWER('%${search}%')`
                        ), // Thêm tên bảng 'products' trước cột 'name'
                    ],
                };
            } else {
                if (search && search.length > 0) {
                    whereCondition = literal(
                        `LOWER(products.name) LIKE LOWER('%${search}%')`
                    ); // Thêm tên bảng 'products' trước cột 'name'
                }
                if (category_id) {
                    whereCondition.category_id = category_id;
                }
            }
            whereCondition.price = {
                [Op.lte]: price,
            };
            const queryOptions = {
                where: whereCondition,
                attributes: [
                    "id",
                    "name",
                    "price",
                    "quantity",
                    "img",
                    "averageStar",
                    "count_review",
                ],
                include: {
                    model: Category,
                    attributes: ["name"],
                },
                order: [["averageStar", "DESC"]],
                limit: limit,
                offset: page * limit - 1 >= 0 ? page * limit - 1 : 0,
            };

            console.log(queryOptions);

            const { rows, count } = await Product.findAndCountAll(queryOptions);
            const results = rows.map((row) => row.get({ plain: true }));

            return { results, count };
        } catch (error) {
            console.log(error);
            throw new Error("Error retrieving products");
        }
    }
}

export default new ProductRepository();
