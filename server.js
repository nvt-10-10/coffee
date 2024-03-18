import bodyParser from "body-parser";
import express from "express";
import router from "./routers/Index.js";
import cors from "cors";
import { fileURLToPath } from "url";
import { dirname } from "path";
import sequelize from "./connect/ConnectDb.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
    cors({
        origin: "http://localhost:8080",
    })
);

dotenv.config();

const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);

global.__dirname = __dirname;
(async () => {
    await sequelize.sync();
    console.log("Database synchronized");
})();

app.use(cookieParser());
app.use(router);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
