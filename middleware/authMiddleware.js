import ResponseHandler from "../utils/ResponseHandler.js";
import authService from "../services/authService.js";
import { log } from "console";

class AuthMiddleware {
    async authMiddleware(req, res, next) {
        const token = req.headers.authorization;
        if (!token) {
            return ResponseHandler.error(
                res,
                "Cần có mã thông báo ủy quyền",
                401
            );
        }
        try {
            console.log("token", token);

            const decoded = await authService.decodeAccessToken(token);
            console.log("token", token);

            req.user = decoded;
            log("decoded", decoded);
            next();
        } catch (error) {
            console.log(error);
            return ResponseHandler.error(res, "Bạn không có quyền này", 401);
        }
    }

    async staffMiddleware(req, res, next) {
        await AuthMiddleware.prototype.authMiddleware(req, res, async () => {
            const user = req.user;
            console.log("user name ", user);
            if (!user) {
                return ResponseHandler.error(
                    res,
                    "Bạn không có quyền này",
                    403
                );
            }
            if (
                user.role.includes("Nhân viên") ||
                user.role.includes("Quản lý")
            ) {
                next();
            } else
                return ResponseHandler.error(
                    res,
                    "Bạn không có quyền này",
                    403
                );
        });
    }

    async adminMiddleware(req, res, next) {
        await AuthMiddleware.prototype.authMiddleware(req, res, async () => {
            const user = req.user;
          
            if (user.role.includes("Quản lý")) {
                next();
            } else {
                return ResponseHandler.error(
                    res,
                    "Bạn không có quyền này",
                    403
                );
            }
        });
    }
}

export default new AuthMiddleware();
