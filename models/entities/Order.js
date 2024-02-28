import { DataTypes } from "sequelize";
import sequelize from "../../connect/ConnectDb.js";
import User from "./User.js";
import Payment from "./Payment.js";
const Order = sequelize.define("orders", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        index: true,
    },
});

Payment.hasMany(Order, { as: "payments", foreignKey: "payment_id" });
User.hasMany(Order, { as: "client", foreignKey: "client_id" });
User.hasMany(Order, { as: "staff", foreignKey: "staff_id" });
Order.belongsTo(Payment, { foreignKey: "payment_id" });
Order.belongsTo(User, { foreignKey: "client_id" });
Order.belongsTo(User, { foreignKey: "staff_id" });

Order;
(async () => {
    await sequelize.sync();
    console.log("Database synchronized");
})();

export default Order;
