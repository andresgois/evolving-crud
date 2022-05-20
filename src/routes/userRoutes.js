const express = require('express');
const UserController = require('../modulos/User/useCase/UserController');
const route = express.Router();

const userController = new UserController();

route.get('/users', userController.listAll);

route.get('/user/:id', userController.listOne);

route.post('/user', userController.create);

route.put('/user/:id', userController.update);

route.delete('/user/:id', userController.destroy);


module.exports = route;