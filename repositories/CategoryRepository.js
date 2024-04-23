import sequelize from "../connect/ConnectDb.js";
import Category from "../models/entities/Category.js";

class CategoryRepository {
    async getCategoriesByTypeWithItems() {
        try {
            const types = await Category.findAll({
                attributes: [
                    [sequelize.fn("DISTINCT", sequelize.col("type")), "type"],
                ],
            });

            const categoriesByType = await Promise.all(
                types.map(async (type) => {
                    const categories = await Category.findAll({
                        where: {
                            type: type.type,
                        },
                        attributes: ["id", "name"],
                    });

                    return {
                        type: type.type,
                        items: categories,
                    };
                })
            );

            return categoriesByType;
        } catch (error) {
            console.error(
                "Error fetching categories by type with items:",
                error
            );
            throw error;
        }
    }
}

export default new CategoryRepository();
