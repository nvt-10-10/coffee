import { body, validationResult, param } from "express-validator";
import ResponseHandler from "../utils/ResponseHandler.js";
const validatorCategoryCreate = [
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

const validatorCategoryUpdate = [
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

const validatorCategoryDelete = [
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

const categoryValidator = {
    validatorCategoryCreate,
    validatorCategoryUpdate,
    validatorCategoryDelete,
};
export default categoryValidator;
