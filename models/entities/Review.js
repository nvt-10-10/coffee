import { DataTypes } from "sequelize";
import sequelize from "../../connect/ConnectDb.js";
import Product from "./Product.js";
import User from "./User.js";
const Review = sequelize.define(
    "reviews",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            index: true,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        star: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        scopes: {
            base: {
                attributes: ["id", "star", "content", "createdAt"],
                include: {
                    model: User,
                    attributes: ["name", "avatar"],
                },
            },
        },
    }
);

Product.hasMany(Review, { as: "products", foreignKey: "product_id" });
User.hasMany(Review, { as: "users", foreignKey: "user_id" });
Review.belongsTo(Product, { foreignKey: "product_id" });
Review.belongsTo(User, { foreignKey: "user_id" });

Review.afterCreate(async (review) => {
    const productId = review.product_id;
    const product = await Product.findByPk(productId);
    const reviews = await Review.findAll({ where: { product_id: productId } });
    let totalStars = 0;
    reviews.forEach((item) => {
        totalStars += item.star;
    });
    const averageStar = totalStars / reviews.length;
    const count_review = product.count_review + 1;

    await product.update({ averageStar, count_review });
});

// (async () => {
//     await sequelize.sync();
//     console.log("Database synchronized");
// })();

export default Review;
