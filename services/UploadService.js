import fs from "fs";
import path from "path";
class UploadService {
    constructor(uploadDir) {
        this.uploadDir = uploadDir;
    }

    async saveFile(file, option = null) {
        try {
            const timestamp = Date.now(); // Lấy thời gian hiện tại dưới dạng timestamp
            const fileName = `${timestamp}_${file.originalname}`; // Tạo tên file mới
            const filePath = "upload/" + path.join(this.uploadDir, fileName);
            console.log(path);
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
