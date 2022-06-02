const LoginService = require("../services/LoginService");

const loginService = new LoginService();

class LoginController {


    async login(req, res) {
        const {email, senha} = req.body;
        const users = await loginService.login(email, senha);

        return res.json(users);
    }

}

module.exports = LoginController;