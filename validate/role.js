import { body, validationResult } from "express-validator";
import ResponseHandler from "../utils/ResponseHandler.js";
const validateRole = [
    // body("id", "Id phải là số nguyên").not().isNumeric(),
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

const roleValidate = { validateRole };
export default roleValidate;
