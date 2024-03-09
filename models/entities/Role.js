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
            unique: true,
        },
    },
    {
        scopes: {
            base: {
                attributes: ["id", "name"],
            },
        },
    },
    {
        timestamps: true,
    }
);

(async () => {
    await sequelize.sync();
    console.log("Database synchronized");
})();

export default Role;
