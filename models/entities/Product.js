import { DataTypes } from "sequelize";
import sequelize from "../../connect/ConnectDb.js";
const Product = sequelize.define("products", {
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
});

async () => {
    await sequelize.sync();
};

export default Product;
