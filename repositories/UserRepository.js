import User from "../models/entities/User.js";

class UserRepository {
    async checkUserName(username) {
        User.findOne({
            where: {
                username,
            },
        });
    }
}
export default new UserRepository();
