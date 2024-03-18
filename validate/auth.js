import { check, body, validationResult } from "express-validator";
import ResponseHandler from "../utils/ResponseHandler.js";

const validateLogin = [
    body("email", "Email không được để rỗng").not().isEmpty(),
    body("email", "Email không hợp lệ").isEmail(),
    body("password", "Email hoặc mật khẩu không đúng").isLength({ min: 6 }),
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

const validateRegister = [
    check("email", "Email không được để rỗng").not().isEmpty(),
    check("email", "Email không hợp lệ").isEmail(),
    check("name", "Tên  không được để rỗng").not().isEmpty(),
    check("password", "Độ dài mật khẩu có ít nhất 6 kí tự").isLength({
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
const authValidate = { validateLogin, validateRegister };
export default authValidate;
