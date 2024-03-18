import jwt from "jsonwebtoken";
import config from "../config/JwtConfig.js";
import ResponseHandler from "../utils/ResponseHandler.js";
import { validationResult } from "express-validator";
class authMiddleware {
    async authMiddleware(req, res, next) {
        console.log("da qya");
        const token = req.headers.authorization;
        if (!token) {
            return ResponseHandler.error(
                res,
                "Cần có mã thông báo ủy quyền",
                401
            );
        }
        try {
            const decoded = jwt.verify(token, config.jwtSecret);
            req.user = decoded;
            next();
        } catch (error) {
            return ResponseHandler.error(res, "Mã không hợp lệ", 401);
        }
    }
    async loginMiddleware(req, res, next) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const errorMessage = errors
                .array()
                .map((error) => error.msg)
                .join(" ");
            return ResponseHandler.error(res, errorMessage, 401);
        }
        next();
    }
}

export default new authMiddleware();
