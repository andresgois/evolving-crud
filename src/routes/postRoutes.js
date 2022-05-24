const express = require('express');
const PostController = require('../modulos/Post/controller/PostController');
const route = express.Router();

const postController = new PostController();

route.get('/', postController.listAll);

route.get('/:id', postController.listOne);

route.post('/', postController.create);

route.put('/:id', postController.update);

route.delete('/:id', postController.destroy);


module.exports = route;