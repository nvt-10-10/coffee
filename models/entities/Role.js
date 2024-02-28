import { DataTypes } from "sequelize";
import sequelize from "../../connect/ConnectDb.js";
const Role = sequelize.define(
    "roles",
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

export default Role;