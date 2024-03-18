import crypto from "crypto";
const jwtConfig = {
    jwtSecret: crypto.randomBytes(32).toString("hex"),
    jwtExpiresIn: "1h",
};

export default jwtConfig;
