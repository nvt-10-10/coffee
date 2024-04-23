import { DataTypes } from "sequelize";
import sequelize from "../../connect/ConnectDb.js";
import Category from "./Category.js";
import Cart from "./Cart.js";
const Product = sequelize.define(
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
            type: DataTypes.TEXT,
        },

        averageStar: {
            type: DataTypes.FLOAT,
            defaultValue: 0,
        },

        count_review: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },

        isFeatured: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },

        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
    },
    {
        scopes: {
            base: {
                attributes: [
                    "id",
                    "name",
                    "price",
                    "img",
                    "averageStar",
                    "count_review",
                    "quantity",
                ],

                include: {
                    model: Category,
                    attributes: ["name", "id"],
                },
            },
            detail: {
                attributes: ["quantity", "descriptions"],
            },
        },
    }
);
Category.hasMany(Product, { as: "categories", foreignKey: "category_id" });
Product.belongsTo(Category, { foreignKey: "category_id" });
export default Product;
