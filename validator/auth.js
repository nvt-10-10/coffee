import { body, validationResult } from "express-validator";
import ResponseHandler from "../utils/ResponseHandler.js";
const validatorLogin = [
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

const validatorRegister = [
    body("email", "Email không được để rỗng").not().isEmpty(),
    body("email", "Email không hợp lệ").isEmail(),
    body("name", "Tên  không được để rỗng").not().isEmpty(),
    body("username", "Tên  không được để rỗng").not().isEmpty(),
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
