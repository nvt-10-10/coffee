import { DataTypes } from "sequelize";
import sequelize from "../../connect/ConnectDb.js";
import Role from "./Role.js";
const User = sequelize.define(
    "users",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            index: true,
        },

        username: {
            type: DataTypes.STRING,
            allowNull: false,
            index: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            index: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            index: true,
        },
        address: {
            type: DataTypes.STRING,
        },
        phone: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
        },
    },
    {
        scopes: {
            base: {
                attributes: ["id", "name", "img"],
            },
            role: {
                include: {
                    model: Role,
                    attributes: ["name"],
                },
            },
            detail: {
                attributes: [
                    "username",
                    "password",
                    "address",
                    "phone",
                    "email",
                ],
            },
        },
    }
);

Role.hasMany(User, { as: "users", foreignKey: "role_id" });
User.belongsTo(Role, { foreignKey: "role_id" });

async () => {
    await sequelize.sync();
};

export default User;
