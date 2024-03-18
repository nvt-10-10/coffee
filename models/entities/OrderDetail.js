import { DataTypes } from "sequelize";
import sequelize from "../../connect/ConnectDb.js";
import Order from "./Order.js";
import Product from "./Product.js";
const OrderDetail = sequelize.define("payments", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        index: true,
    },

    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});
Order.hasMany(OrderDetail, { as: "order_details", foreignKey: "order_id" });
Product.hasMany(OrderDetail, { as: "products", foreignKey: "product_id" });

OrderDetail.belongsTo({ foreignKey: "order_id" });
OrderDetail.belongsTo({ foreignKey: "product_id" });
// (async () => {
//     await sequelize.sync();
//     console.log("Database synchronized");
// })();

export default OrderDetail;
