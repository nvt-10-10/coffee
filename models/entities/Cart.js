import { DataTypes } from "sequelize";
import sequelize from "../../connect/ConnectDb.js";
import User from "./User.js";
import Product from "./Product.js";
const Cart = sequelize.define(
    "carts",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            index: true,
        },
        quantity: {
            type: DataTypes.INTEGER,
        },

        product_id: {
            type: DataTypes.INTEGER,
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
User.hasMany(Cart, { foreignKey: "user_id" });
Cart.belongsTo(User, { as: "users", foreignKey: "user_id" });


export default Cart;
