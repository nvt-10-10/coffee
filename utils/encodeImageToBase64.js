import fs from "fs";
import ResponseHandler from "./ResponseHandler.js";
export default function encodeImageToBase64(filePath, res) {
    try {
        const data = fs.readFileSync(filePath);
        const base64Image = data.toString("base64");
        return ResponseHandler.success(
            res,
            "Lay du lieu thanh cong ",
            {
                base64Image: "data:image/jpeg;base64," + base64Image,
            },
            200
        );
    } catch (error) {
        return ResponseHandler.error(res, "Loi encode Base64", 500);
    }
}
