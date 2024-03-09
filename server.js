import bodyParser from "body-parser";
import express, { Router } from "express";
import router from "./routers/Index.js";
import cors from "cors";
import { fileURLToPath } from "url";
import { dirname } from "path";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
    cors({
        origin: "http://localhost:8080",
    })
);

// Lấy đường dẫn của tệp hiện tại
const __filename = fileURLToPath(import.meta.url);

// Lấy thư mục cha của tệp hiện tại
const __dirname = dirname(__filename);

// Gán biến global để sử dụng ở bất kỳ đâu trong ứng dụng của bạn
global.__dirname = __dirname;

app.use(router);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
