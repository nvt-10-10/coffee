import { DataTypes } from "sequelize";
import sequelize from "../../connect/ConnectDb.js";
const Category = sequelize.define("categories", {
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
});

async () => {
    await sequelize.sync();
};

export default Category;
