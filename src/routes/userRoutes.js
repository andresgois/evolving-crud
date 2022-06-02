const express = require('express');
const UserController = require('../modulos/User/controller/UserController');
const route = express();
const path = require('path')
const multer = require('multer');
const multerConfig = require('../helps/upload')

route.use('/files', express.static(path.resolve(__dirname, '..','..','public')))

const userController = new UserController();

route.get('/', userController.listAll);

route.get('/:id', userController.listOne);

route.post('/', multer(multerConfig).single('file'), userController.create);

route.put('/:id', userController.update);

route.delete('/:id', userController.destroy);


module.exports = route;