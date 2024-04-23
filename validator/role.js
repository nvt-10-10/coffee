import { body, validationResult, param } from "express-validator";
import ResponseHandler from "../utils/ResponseHandler.js";
const validatorRoleCreate = [
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

const validatorRoleUpdate = [
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

const validatorRoleDelete = [
    param("id", "Id phải là số nguyên").isNumeric(),
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

const roleValidator = {
    validatorRoleCreate,
    validatorRoleUpdate,
    validatorRoleDelete,
};
export default roleValidator;
