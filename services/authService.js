import jwt from "jsonwebtoken";
import ResponseHandler from "../utils/ResponseHandler.js";
import User from "../models/entities/User.js";
import { comparePassword, hashPassword } from "../utils/bcryptUtils.js";
import { ValidationError, where } from "sequelize";
import Role from "../models/entities/Role.js";
import { handleValidationError } from "../utils/HandleValidationError.js";

class AuthService {
    async login(req, res) {
        try {
            const { email, password } = req.body;
            console.log({ email, password });
            const user = await User.findOne({ where: { email } });
            if (user) {
                if (await comparePassword(password, user.password)) {
                    const token = await this.generateAccessToken(user);
                    const refreshToken = await this.generateRefreshToken(user);
                    res.cookie("refreshToken", refreshToken, {
                        httpOnly: true,
                        secure: false,
                        path: "/",
                        sameSite: "strict",
                    });

                    if (!user.refreshToken) {
                        await user.update(refreshToken);
                    }
                    ResponseHandler.success(res, "Đăng nhập thành công", {
                        token,
                    });
                }
            } else {
                ResponseHandler.error(res, "Tài khoản không tồn tại");
            }
        } catch (error) {
            console.log(error);
            return ResponseHandler.error(res, "Xảy ra lỗi ở máy chủ");
        }
    }

    async register(res, userData) {
        try {
            if (!userData?.role_id) {
                const role = await Role.findOne({
                    where: {
                        name: "Người dùng ",
                    },
                });
                userData.role_id = role.id;
            }
            userData.password = await hashPassword(userData.password);
            await User.create(userData);
            ResponseHandler.success(res, "Tạo tài khoản thành công");
        } catch (error) {
            console.log(error);
            if (error instanceof ValidationError) {
                ResponseHandler.error(res, handleValidationError(error.errors));
                return;
            }
            ResponseHandler.error(res, "Xảy ra lỗi ở máy chủ");
        }
    }

    async generateAccessToken(user) {
        return jwt.sign(
            { id: user.id, email: user.email },
            process.env.ACCESS_TOKEN_KEY,
            {
                expiresIn: process.env.TIME_ACCESS_TOKEN,
            }
        );
    }

    async generateRefreshToken(user) {
        return jwt.sign(
            { id: user.id, email: user.email },
            process.env.REFRESH_TOKEN_KEY,
            {
                expiresIn: process.env.TIME_REFRESH_TOKEN,
            }
        );
    }

    async decodeAccessToken(token) {
        try {
            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_KEY);
            return decoded;
        } catch (error) {
            throw new Error("Invalid access token");
        }
    }

    async decodeRefreshToken(token) {
        try {
            console.log("RefreshToken", token);
            const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_KEY);
            return decoded;
        } catch (error) {
            throw new Error("Invalid refresh token");
        }
    }

    async refreshAccessToken(req, res) {
        try {
            var refreshToken = req.cookies.refreshToken;
            console.log("refreshToken", refreshToken);
            if (refreshToken) {
                const user = await this.decodeRefreshToken(refreshToken);
                if (user) {
                    const token = await this.generateAccessToken(user);
                    const newRefreshToken = await this.generateRefreshToken(
                        user
                    );
                    res.cookie("refreshToken", refreshToken, {
                        httpOnly: true,
                        secure: false,
                        path: "/",
                        sameSite: "strict",
                    });
                    await User.update(
                        { refreshToken: newRefreshToken }, // Dữ liệu mới sẽ được cập nhật
                        { where: { id: user.id } } // Điều kiện xác định hàng cần cập nhật
                    );
                    return ResponseHandler.success(res, "Mã xác thực", {
                        token,
                    });
                }
            } else {
                return ResponseHandler.error(res, "Mã xác thực không đúng");
            }
        } catch (error) {
            console.log(error);
        }
    }

    async logout(req, res) {
        try {
            const refreshToken = req.cookies.refreshToken;
            let user;
            if (refreshToken) {
                user = await this.decodeRefreshToken(refreshToken);
            }
            if (user) {
                await User.update(
                    { refreshToken: null },
                    { where: { id: user.id } }
                );

                res.clearCookie("refreshToken");
                return ResponseHandler.success(res, "Đăng xuất thành công");
            } else {
                return ResponseHandler.error(res, "Bạn chưa đăng nhập");
            }
        } catch (error) {
            console.log(error);
            ResponseHandler.error(res, "Xảy ra lỗi ở máy chủ");
        }
    }
}

export default new AuthService();
