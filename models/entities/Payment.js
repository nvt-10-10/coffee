import { DataTypes } from "sequelize";
import sequelize from "../../connect/ConnectDb.js";
import Order from "./Order.js";
const Payment = sequelize.define("payments", {
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

(async () => {
    await sequelize.sync();
    console.log("Database synchronized");
})();

export default Payment;
