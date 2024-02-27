import User from "../models/entities/User";

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
