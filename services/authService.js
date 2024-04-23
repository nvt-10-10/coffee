import jwt from "jsonwebtoken";
import ResponseHandler from "../utils/ResponseHandler.js";
import User from "../models/entities/User.js";
import { comparePassword, hashPassword } from "../utils/bcryptUtils.js";
import { ValidationError, where } from "sequelize";
import Role from "../models/entities/Role.js";
import { handleValidationError } from "../utils/HandleValidationError.js";
import { sendEmail } from "../utils/sendMail.js";

class AuthService {
    async login(req, res) {
        try {
            const { username, password } = req.body;
            const user = await User.findOne({
                where: { username },
                include: {
                    model: Role,
                    attributes: ["name"],
                },
            });

            if (user) {
                if (await comparePassword(password, user.password)) {
                    const token = await this.generateAccessToken(user);
                    const refreshToken = await this.generateRefreshToken(user);
                    res.cookie("refreshToken", refreshToken, {
                        httpOnly: true,
                        secure: false,
                        path: "/",
                        sameSite: "strict",
                        maxAge: 7 * 24 * 60 * 60 * 1000,
                    });

                    res.cookie("refreshToken1", refreshToken, {
                        httpOnly: false,
                        secure: false,
                        path: "/",
                        sameSite: "strict",
                        maxAge: 7 * 24 * 60 * 60 * 1000,
                    });

                    if (!user.refreshToken) {
                        await user.update(refreshToken);
                    }
                    ResponseHandler.success(res, "Đăng nhập thành công", {
                        token: token,
                        user: {
                            id: user.id,
                            email: user.email,
                            avatar: user.avatar,
                            role: user.role.name,
                        },
                    });
                } else {
                    return ResponseHandler.error(
                        res,
                        "Tài khoản hoặc mật khẩu không đúng"
                    );
                }
            } else {
                return ResponseHandler.error(res, "Tài khoản không tồn tại");
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
                        name: "Người dùng",
                    },
                });
                userData.role_id = role.id;
            }
            userData.password = await hashPassword(userData.password);
            await User.create(userData);
            ResponseHandler.success(res, "Tạo tài khoản thành công");
        } catch (error) {
            if (error instanceof ValidationError) {
                ResponseHandler.error(res, handleValidationError(error.errors));
                return;
            }
            ResponseHandler.error(res, "Xảy ra lỗi ở máy chủ");
        }
    }

    async generateAccessToken(user) {
        return jwt.sign(
            { id: user.id, email: user.email, role: user.role.name },
            process.env.ACCESS_TOKEN_KEY,
            {
                expiresIn: process.env.TIME_ACCESS_TOKEN,
            }
        );
    }

    async generateRefreshToken(user) {
        return jwt.sign(
            { id: user.id, email: user.email, role: user.role.name },
            process.env.REFRESH_TOKEN_KEY,
            {
                expiresIn: process.env.TIME_REFRESH_TOKEN,
            }
        );
    }

    async decodeAccessToken(token) {
        try {
            console.log("token", token);
            console.log("decodeAccessToken", process.env.ACCESS_TOKEN_KEY);
            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_KEY);
            return decoded;
        } catch (error) {
            throw new Error("Invalid access token");
        }
    }

    async decodeRefreshToken(token) {
        try {
            const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_KEY);
            return decoded;
        } catch (error) {
            throw new Error("Invalid refresh token");
        }
    }

    async refreshAccessToken(req, res) {
        try {
            const refreshToken = req.cookies.refreshToken;
            if (refreshToken) {
                const user = await this.decodeRefreshToken(refreshToken);
                if (user) {
                    const token = await this.generateAccessToken(user);
                    const newRefreshToken = await this.generateRefreshToken(
                        user
                    );
                    res.cookie("refreshToken", refreshToken, {
                        httpOnly: true,
                        secure: "false",
                        path: "/",
                        sameSite: "none",
                    });
                    res.setHeader("Token", `Bearer ${token}`);
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
            ResponseHandler.error(res, "Xảy ra lỗi ở máy chủ");
        }
    }

    async logout(req, res) {
        try {
            const refreshToken = req.cookies.refreshToken;
            let user;
            console.log(refreshToken);
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
            ResponseHandler.error(res, "Xảy ra lỗi ở máy chủ");
        }
    }

    async forgotPassword(req, res) {
        try {
            const { username } = req.body;
            console.log(req.body);
            const user = await User.findOne({
                where: { username: username },
            });

            if (user) {
                const pass = await this.generateRandomString(10);

                sendEmail(
                    user.email,
                    "Quên mật khẩu",
                    "Mật khẩu mới của bạn là:" + pass
                );

                user.password = await hashPassword(pass);
                user.save();

                ResponseHandler.success(res, "Doi mat khau thanh cong");
            } else {
                ResponseHandler.error(
                    res,
                    "Tài khoản hoặc mật khẩu không tồn tại"
                );
            }
        } catch (error) {
            console.log(error);
            ResponseHandler.error(res, "Loi xay ra o may chu");
        }
    }

    async generateRandomString(length) {
        const characters =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+";
        let result = "";
        for (let i = 0; i < length; i++) {
            result += characters.charAt(
                Math.floor(Math.random() * characters.length)
            );
        }
        return result;
    }
}

export default new AuthService();
