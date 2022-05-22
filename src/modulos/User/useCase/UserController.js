const UserUseCase = require("./UserUseCase");

const userUseCase = new UserUseCase();

class UserController {


    async listAll(req, res) {
        const users = await userUseCase.index();
        console.log('users')
        console.log(users)
        return res.json(users);
    }

    async listOne(req,res) {
        var id = req.params.id;
        const user = await userUseCase.indexOne(id)

        return res.json(user);
    }

    async create(req,res) {
        var { 
            name, imagem, cep,logradouro,complemento,bairro,localidade,uf 
        } = req.body;

        await userUseCase.store(
            name, imagem, cep,logradouro,complemento,bairro,localidade,uf 
        );
        return res.status(201).send()
    }

    async update(req,res) {
        var id = req.params.id;
        var { name, age } = req.body;
        
        const user = await userUseCase.update(id, name, age);
        return res.status(204).json(user);
    }

    async destroy(req,res) {
        var id = req.params.id;
        await userUseCase.delete(id);
        return res.send();
    }

}

module.exports = UserController;