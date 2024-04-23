import { body, validationResult } from "express-validator";
import ResponseHandler from "../utils/ResponseHandler.js";
const validatorCreate = [
    body("name", "Tên không được để trống").not().isEmpty(),
    body("email", "Email phải đúng định dạng").isEmail(),
    body("phone", "Số điện thoại không được để trống").not().isEmpty(),
    body("address", "Địa chỉ không được để trống").not().isEmpty(),

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

export { validatorCreate };
