import { DataTypes } from "sequelize";
import sequelize from "../../connect/ConnectDb.js";
const Category = sequelize.define(
    "categories",
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
            unique: true,
        },

        type: {
            type: DataTypes.STRING,
            defaultValue: "Đồ ăn",
        },
    },
    {
        scopes: {
            base: {
                attributes: ["id", "name", "type"],
            },
        },
    }
);

// s

export default Category;
