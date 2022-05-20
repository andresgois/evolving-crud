const UserUseCase = require("./UserUseCase");

const userUseCase = new UserUseCase();

class UserController {


    listAll(req, res) {
        const users = userUseCase.index();
        return res.json(users);
    }

    listOne(req,res) {
        var id = req.params.id;
        const user = userUseCase.indexOne(id)

        return res.json(user);
    }

    create(req,res) {
        var { name, age } = req.body;

        userUseCase.store(name, age);
        return res.status(201).send()
    }

    update(req,res) {
        var id = req.params.id;
        var { name, age } = req.body;
        
        const user = userUseCase.update(id, name, age);
        return res.status(204).json(user);
    }

    destroy(req,res) {
        var id = req.params.id;
        userUseCase.delete(id);
        return res.send();
    }

}

module.exports = UserController;