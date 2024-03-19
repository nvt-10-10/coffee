import { check, body, validationResult, query, param } from "express-validator";
import ResponseHandler from "../utils/ResponseHandler.js";
const validateRoleCreate = [
    body("name", "Tên không được để rỗng").not().isEmpty(),
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

const validateRoleUpdate = [
    body("id", "Id phải là số nguyên").isNumeric(),
    body("name", "Tên không được để rỗng").not().isEmpty(),
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

const validateRoleDelete = [
    param("id", "Id phải là số nguyên").isNumeric(),
    param("id", "id không được để rỗng").isEmpty(),
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

const roleValidate = {
    validateRoleCreate,
    validateRoleUpdate,
    validateRoleDelete,
};
export default roleValidate;
