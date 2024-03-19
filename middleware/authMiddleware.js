import ResponseHandler from "../utils/ResponseHandler.js";
import authService from "../services/authService.js";

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
            const decoded = await authService.decodeAccessToken(token);
            req.user = decoded;
            next();
        } catch (error) {
            return ResponseHandler.error(res, "Mã không hợp lệ", 401);
        }
    }

    async adminMiddleware(req, res, next) {
        await AuthMiddleware.prototype.authMiddleware(req, res, async () => {
            const user = req.user;
            console.log(user);
            if (!user || !user.role.includes("Quản lý")) {
                return ResponseHandler.error(
                    res,
                    "Không đủ quyền truy cập",
                    403
                );
            }
            next();
        });
    }
}

export default new AuthMiddleware();
