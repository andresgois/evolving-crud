const { v4: uuid } = require('uuid');
const PostRepository = require('../repository/PostRepository');

class PostService {

    async index(){
        const posts = await PostRepository.listAllPost();
        return posts;
    }

    async store(descricao ){
        var post = await PostRepository.createPost( descricao );
        return  post;
    }
    
}

module.exports = PostService;