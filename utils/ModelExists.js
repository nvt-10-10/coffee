import User from "../models/entities/User";
import ResponseHandler from "./ResponseHandler";

async function UserExists(res, id) {
    const user = await User.findByPk(id);
    if (!user) {
        ResponseHandler.success;
    }
}
