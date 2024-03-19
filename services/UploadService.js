import { log } from "console";
import fs from "fs";
import path from "path";
import { Rembg } from "@xixiyahaha/rembg-node";
import sharp from "sharp";
class UploadService {
    constructor(uploadDir) {
        this.uploadDir = uploadDir;
    }

    async saveFile(file, option = null) {
        try {
            const timestamp = Date.now(); // Lấy thời gian hiện tại dưới dạng timestamp
            const fileName = `${timestamp}_${file.originalname}`; // Tạo tên file mới
            const filePath = path.join(this.uploadDir, fileName);

            return new Promise((resolve, reject) => {
                fs.rename(file.path, filePath, (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(filePath);
                    }
                });
            });
        } catch (error) {
            console.log(error);
        }
    }

    async deleteFile(filePath) {
        filePath = global.__dirname + "/" + filePath;
        return new Promise((resolve, reject) => {
            fs.unlink(filePath, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }
}

export default UploadService;
