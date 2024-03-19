import { body, validationResult, param } from "express-validator";
import ResponseHandler from "../utils/ResponseHandler.js";

const validatorUserUpdate = [
    // body("id", "Id phải là số nguyên").isNumeric(),
    body("password", "Mật khẩu phải là chuỗi và có ít nhất 6 kí tự")
        .optional()
        .isString()
        .isLength({ min: 6 }),
    body("name", "Tên không được để rỗng").optional().not().isEmpty(),
    body("address", "Tên không được để rỗng").optional().not().isString(),
    body(
        "phone",
        "Số điện thoại không hợp lệ. Số điện thoại phải bắt đầu bằng số 0 hoặc +84, và có 9 hoặc 10 chữ số."
    )
        .optional()
        .custom((value) => {
            if (!/^(0|(\+84))[1-9]\d{8,9}$/.test(value)) {
                throw new Error(
                    "Số điện thoại không hợp lệ. Số điện thoại phải bắt đầu bằng số 0 hoặc +84, và có 9 hoặc 10 chữ số."
                );
            }
            return true;
        }),
    body("email", "Email không được để rỗng").optional().not().isEmpty(),
    body("email", "Email không hợp lệ").optional().isEmail(),
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

const validatorUserDelete = [
    param("id", "Id phải là số nguyên").isNumeric(),
    param("id", "id không được để rỗng").not().isEmpty(),
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

const userValidator = {
    validatorUserUpdate,
    validatorUserDelete,
};
export default userValidator;
