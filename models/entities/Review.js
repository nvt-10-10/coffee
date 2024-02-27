import { DataTypes } from "sequelize";
import sequelize from "../../connect/ConnectDb.js";
import Product from "./Product.js";
const Review = sequelize.define("reviews", {
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
        type: Number,
        allowNull: false,
    },
});

Product.hasMany(Review, { as: "products", foreignKey: "product_id" });
Review.belongsTo(Product, { foreignKey: "product_id" });
async () => {
    await sequelize.sync();
};

export default Review;
