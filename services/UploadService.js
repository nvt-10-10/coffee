import fs from "fs";
import path from "path";

class UploadService {
    constructor(uploadDir) {
        this.uploadDir = uploadDir;
    }

    async saveFile(file) {
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
}

export default UploadService;
