const express = require('express');
const UserController = require('../modulos/User/controller/UserController');
const route = express.Router();

const userController = new UserController();

route.get('/', userController.listAll);

route.get('/:id', userController.listOne);

route.post('/', userController.create);

route.put('/:id', userController.update);

route.delete('/:id', userController.destroy);


module.exports = route;