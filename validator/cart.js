import { body, validationResult } from "express-validator";
import ResponseHandler from "../utils/ResponseHandler.js";
const validatorCreate = [
    body("user_id", "Id phải là số nguyên").isNumeric(),
    body("product_id", "Id phải là số nguyên").isNumeric(),
    body("quantity", "Id phải là số nguyên").isNumeric(),

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
