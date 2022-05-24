const UserService = require("../services/UserService");

const userService = new UserService();

class UserController {


    async listAll(req, res) {
        const users = await userService.index();

        return res.json(users);
    }

    async listOne(req,res) {
        var id = req.params.id;
        const user = await userService.indexOne(id)

        return res.json(user);
    }

    async create(req,res) {
        var { 
            name, imagem, cep,logradouro,complemento,bairro,localidade,uf 
        } = req.body;

        await userService.store(
            name, imagem, cep,logradouro,complemento,bairro,localidade,uf 
        );
        return res.status(201).send()
    }

    async update(req,res) {
        var id = req.params.id;
        var { name, age } = req.body;
        
        const user = await userService.update(id, name, age);
        return res.status(204).json(user);
    }

    async destroy(req,res) {
        var id = req.params.id;
        await userService.delete(id);
        return res.send();
    }

}

module.exports = UserController;