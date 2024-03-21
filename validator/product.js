import { body, validationResult, param, query } from "express-validator";
import ResponseHandler from "../utils/ResponseHandler.js";

const validatorProductCreate = [
    body("name", "Tên không được để trống").not().isEmpty(),
    body("price", "Giá sản phẩm phải là một số").isFloat(),
    body("quantity", "Số lượng sản phẩm phải là một số nguyên").isInt(),
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

const validatorProductUpdate = [
    body("id", "Id sản phẩm phải là một số nguyên").isInt(),
    body("id", "Id sản phẩm không được để trống").not().isEmpty(),
    body("name", "Tên không được để trống").not().isEmpty(),
    body("price", "Giá sản phẩm phải là một số").isFloat(),
    body("quantity", "Số lượng sản phẩm phải là một số nguyên").isInt(),
    body("descriptions", "Mô tả không được để trống").not().isEmpty(),
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
const validatorProductDelete = [
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
const validatorProductQuery = [
    param("id", "Id sản phẩm phải là một số nguyên").optional().isInt(),
    query("page", "Trường page phải là một số nguyên").optional().isInt(),
    query("price", "Trường price phải là một số").optional().isFloat(),
    query("category_id", "Trường category_id phải là một số nguyên")
        .optional()
        .isInt(),
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
const productValidator = {
    validatorProductCreate,
    validatorProductUpdate,
    validatorProductDelete,
    validatorProductQuery,
};

export default productValidator;
