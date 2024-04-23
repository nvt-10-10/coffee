import UserService from "../services/UserService.js";
class UserController {
    async getAllStaff(req, res) {
        await UserService.getAllStaff(res, "base");
    }

    async getAllUser(req, res) {
        await UserService.getAllUser(res, "base");
    }

    async getAllUserByPage(req, res) {
        const page = req.params.page;
        await UserService.getAllUserByPage(res, page);
    }

    async getUserDetailById(req, res) {
        const id = req.params.id;
        await UserService.getUserDetailById(res, id);
    }
    async getUserById(req, res) {
        const id = req.params.id;
        await UserService.getUserById(res, id);
    }
    async createUser(req, res) {
        const { username, password, email, address, name, phone, role_id } =
            req.body;
        let file;
        if (req.uploadedFile) {
            file = req.uploadedFile;
        }

        await UserService.createUser(
            res,
            {
                username,
                password,
                name,
                email,
                address,
                phone,
                role_id,
            },
            file
        );
    }
    async updateUser(req, res) {
        const {
            id,
            username,
            password,
            email,
            address,
            name,
            phone,
            role_id,
            status,
        } = req.body;
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
                address,
                name,
                email,
                phone,
                role_id,
                status,
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
