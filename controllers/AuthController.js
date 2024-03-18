import AuthService from "../services/authService.js";

class AuthController {
    async login(req, res) {
        await AuthService.login(req, res);
    }

    async register(req, res) {
        const { username, password, email, name } = req.body;
        await AuthService.register(res, { username, password, email, name });
    }

    async refreshToken(req, res) {
        await AuthService.refreshAccessToken(req, res);
    }

    async logout(req, res) {
        await AuthService.logout(req, res);
    }
}

export default new AuthController();
