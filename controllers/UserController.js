import UserService from "../services/UserService.js";
class UserController {
    async getAllUser(req, res) {
        await UserService.getAll(res);
    }

    async getAllUserByPage(req, res) {
        const page = req.params.page;
        await UserService.getAllUserByPage(res, page);
    }

    async getUserById(req, res) {
        const id = req.params.id;
        await UserService.getUserById(res, id);
    }

    async createUser(req, res) {
        const { username, password, email, name, phone } = req.body;
        await UserService.createUser(res, {
            username,
            password,
            name,
            email,
            phone,
        });
    }

    async updateUser(req, res) {
        const { id, username, password, email, name, phone } = req.body;
        let file;
        if (req.uploadedFile) {
            file = req.uploadedFile;
        }
        await UserService.updateUser(
            res,
            id,
            {
                id,
                username,
                password,
                name,
                email,
                phone,
            },
            file
        );
    }

    async deleteUser(req, res) {
        const id = req.params.id;
        await UserService.deleteUser(res, id);
    }
}

export default new UserController();
