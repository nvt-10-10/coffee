import { DataTypes } from "sequelize";
import sequelize from "../../connect/ConnectDb.js";
import Order from "./Order.js";
import Product from "./Product.js";
const OrderDetail = sequelize.define("order_details", {
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
Product.hasMany(OrderDetail, {
    as: "ordered_products",
    foreignKey: "product_id",
});

OrderDetail.belongsTo(Order, { foreignKey: "order_id" });
OrderDetail.belongsTo(Product, { foreignKey: "product_id" });

// (async () => {
//     await sequelize.sync();
//     console.log("Database synchronized");
// })();

export default OrderDetail;
