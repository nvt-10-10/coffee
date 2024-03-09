import { DataTypes } from "sequelize";
import sequelize from "../../connect/ConnectDb.js";
import Category from "./Category.js";
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
            type: DataTypes.STRING,
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
Category.hasMany(Product, { as: "categories", foreignKey: "category_id" });
Product.belongsTo(Category, { foreignKey: "category_id" });
(async () => {
    await sequelize.sync();
    console.log("Database synchronized");
})();

export default Product;
