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
            console.log(file);
            const timestamp = Date.now(); // Lấy thời gian hiện tại dưới dạng timestamp
            const fileName = `${timestamp}_${file.originalname}`; // Tạo tên file mới
            const filePath = path.join(this.uploadDir, fileName);
            console.log(path.join(global.__dirname, file.path));
            if (option == "remove_bg") {
                file = await this.removeBackground(
                    path.join(global.__dirname, file.path)
                );
            }

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
        console.log(filePath);
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

    async removeBackground(filePath) {
        try {
            const input = sharp(filePath);

            // optional arguments
            const rembg = new Rembg({
                logging: true,
            });

            const output = await rembg.remove(input);

            await output.webp().toFile("test-output.webp");

            // optionally you can use .trim() too!
            await output.trim().webp().toFile("test-output-trimmed.webp");
        } catch (error) {
            throw error;
        }
    }
}

export default UploadService;
