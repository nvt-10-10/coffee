import { DataTypes } from "sequelize";
import sequelize from "../../connect/ConnectDb.js";
import Category from "./Category.js";
const ProductHistory = sequelize.define(
    "products",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            index: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            index: true,
        },
        price: {
            type: DataTypes.FLOAT,
        },
        quantity: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        size: {
            type: DataTypes.STRING,
        },

        img: {
            type: DataTypes.STRING,
        },

        descriptions: {
            type: DataTypes.STRING,
        },

        averageStar: {
            type: DataTypes.FLOAT,
            defaultValue: 0,
        },

        count_review: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
    },
    {
        scopes: {
            base: {
                attributes: ["id", "name", "price"],
            },
        },
    }
);
Product.hasMany(ProductHistory, { as: "products", foreignKey: "product_id" });
ProductHistory.belongsTo(Category, { foreignKey: "product_id" });

export default ProductHistory;
