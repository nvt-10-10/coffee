import { DataTypes } from "sequelize";
import sequelize from "../../connect/ConnectDb.js";
const PaymentMethod = sequelize.define(
    "payment_method",
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
    },
    {
        scopes: {
            base: {
                attributes: ["id", "name"],
            },
        },
    }
);

(async () => {
    await sequelize.sync();
    console.log("Database synchronized");
})();

export default PaymentMethod;
