import Product from "../models/entities/Product.js";
import sequelize from "../connect/ConnectDb.js";

import { QueryTypes } from "sequelize";
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
    async getAllProductByCategories(
        categories,
        price = null,
        page = 0,
        size = 9
    ) {
        let where = "(";
        if (typeof categories === "string") {
            where += ` category_id = ${categories}`;
        } else {
            where += categories
                .map((category_id) => `p.category_id = ${category_id}`)
                .join(` or `);
        }

        if (price) {
            where += `) and price <= ${price} `;
        } else where += ")";

        const query = `SELECT p.id, p.name,p.img,p.price,p.averageStar,p.count_review,c.name  as 'category_name'
        FROM products p JOIN categories c ON p.category_id = c.id 
        where   ${where} 
        order by p.name  limit ${size} offset ${
            page * 9 - 1 > 0 ? page * 9 - 1 : 0
        } `;
        const countQuery = `SELECT count(*) as 'total' FROM products p JOIN categories c ON p.category_id = c.id where  (${where})`;

        const results = await sequelize.query(query, {
            type: QueryTypes.SELECT,
        });
        const total = await sequelize.query(countQuery, {
            type: QueryTypes.SELECT,
        });

        return { results, total };
    }
}
export default new ProductRepository();
