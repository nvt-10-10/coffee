import { DataTypes } from "sequelize";
import sequelize from "../../connect/ConnectDb.js";
const Role = sequelize.define("roles", {
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
});

async () => {
    await sequelize.sync();
};

export default Role;
