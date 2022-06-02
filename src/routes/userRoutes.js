const express = require('express');
const UserController = require('../modulos/User/controller/UserController');
const route = express();
const path = require('path')
const multer = require('multer');
const multerConfig = require('../helps/upload')
const Authenticate = require('../modulos/middleware/auth')
const isAdmin = require('../modulos/middleware/isAdmin')

route.use('/files', express.static(path.resolve(__dirname, '..','..','public')))

const userController = new UserController();

route.get('/', isAdmin, userController.listAll);

route.get('/:id', userController.listOne);

route.post('/', multer(multerConfig).single('file'), userController.create);

route.put('/:id', userController.update);

route.delete('/:id', userController.destroy);

route.put('/admin/:id', userController.turnIntoAdministrator);


module.exports = route;