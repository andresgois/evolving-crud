const PostService = require("../services/PostService");

const postService = new PostService();

class PostController {


    async listAll(req, res) {
        const posts = await postService.index();

        return res.json(posts);
    }

    async listOne(req,res) {
        var id = req.params.id;
        const user = await postService.indexOne(id)

        return res.json(user);
    }

    async create(req,res) {
        var { descricao } = req.body;

        await postService.store( descricao );
        return res.status(201).send()
    }

    async update(req,res) {
        var id = req.params.id;
        var { descricao } = req.body;
        
        const user = await postService.update(id, descricao);
        return res.status(204).json(user);
    }

    async destroy(req,res) {
        var id = req.params.id;
        await postService.delete(id);
        return res.send();
    }

}

module.exports = PostController;