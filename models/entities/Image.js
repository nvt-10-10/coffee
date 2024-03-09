// import { DataTypes } from "sequelize";
// import sequelize from "../../connect/ConnectDb.js";
// import Product from "./Product.js";
// const Image = sequelize.define("images", {
//     id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//         index: true,
//     },

//     name: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         index: true,
//     },
// });

// Product.hasMany(Image, { as: "products", foreignKey: "product_id" });
// Image.belongsTo(Product, { foreignKey: "product_id" });

// (async () => {
//     await sequelize.sync();
//     console.log("Database synchronized");
// })();
// export default Category;
