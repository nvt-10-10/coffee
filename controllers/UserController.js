import UserService from "../services/UserService.js";
class UserController {
    async getAllUser(req, res) {
        await UserService.getAllUsers(res);
    }

    async getUserById(req, res) {
        const id = req.params.id;
        await UserService.getUserById(res, id);
    }

    async createUser(req, res) {
        const { username, password, email, name } = req.body;
        await UserService.createUser(res, { username, password, email, name });
    }

    async updateUser(req, res) {
        const { id, username, password, email, name } = req.body;
        await UserService.updateUser(res, id, {
            id,
            username,
            password,
            email,
            name,
        });
    }

    async deleteUser(req, res) {
        const id = req.params.id;
        await UserService.deleteUser(res, id);
    }
}

export default new UserController();
