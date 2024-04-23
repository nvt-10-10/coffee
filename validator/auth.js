import { body, validationResult } from "express-validator";
import ResponseHandler from "../utils/ResponseHandler.js";
const validatorLogin = [
    body("username", "Tài khoản không được để rỗng").not().isEmpty(),
    body("password", "Tài khoản hoặc mật khẩu không đúng").isLength({ min: 6 }),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errorMessages = errors
                .array()
                .map((error) => error.msg)
                .join("; ");

            return ResponseHandler.error(res, errorMessages);
        }
        next();
    },
];

const validatorRegister = [
    body("email", "Email không hợp lệ").isEmail(),
    body("name", "Tên  không được để rỗng").not().isEmpty(),
    body("username", "Tài khoản  không được để rỗng").not().isEmpty(),
    body("password", "Độ dài mật khẩu có ít nhất 6 kí tự").isLength({
        min: 6,
    }),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errorMessages = errors
                .array()
                .map((error) => error.msg)
                .join("; ");
            return ResponseHandler.error(res, errorMessages);
        }
        next();
    },
];
const authValidator = { validatorLogin, validatorRegister };
export default authValidator;
