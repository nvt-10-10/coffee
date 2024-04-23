import bodyParser from "body-parser";
import express from "express";
import router from "./routers/Index.js";
import cors from "cors";
import sequelize from "./connect/ConnectDb.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

const app = express();
const port = 3000;
dotenv.config();
app.use(cookieParser());

app.use("/images", express.static("upload"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
    cors({
        origin: "http://localhost:8080",
    })
);

(async () => {
    await sequelize.sync();
    console.log("Database synchronized");
})();
app.use(router);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
