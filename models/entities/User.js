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
            unique: true,
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
            validate: {
                isVietnamesePhoneNumber(value) {
                    if (!/^(0|(\+84))[1-9]\d{8,9}$/.test(value)) {
                        throw new Error(
                            "Số điện thoại không hợp lệ. Số điện thoại phải bắt đầu bằng số 0 hoặc +84, và có 9 hoặc 10 chữ số."
                        );
                    }
                },
            },
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            validate: {
                isEmail: true, // Ràng buộc kiểm tra định dạng email
            },
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

(async () => {
    await sequelize.sync();
    console.log("Database synchronized");
})();

export default User;
