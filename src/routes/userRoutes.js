const express = require('express');
const route = express();
const path = require('path')
const multer = require('multer');
const multerConfig = require('../helps/upload')
const Authenticate = require('@Middleware/auth')
const isAdmin = require('@Middleware/isAdmin')
const UserController = require('../modulos/User/controller/UserController');

const userController = new UserController();

route.use('/files', express.static(path.resolve(__dirname, '..','..','public')))

route.get('/', userController.listAll);

route.get('/:id', userController.listOne);

route.post('/', Authenticate, isAdmin, multer(multerConfig).single('file'), userController.create);

route.put('/:id', Authenticate, isAdmin, userController.update);

route.delete('/:id', isAdmin, userController.destroy);

route.put(
    '/admin/:id',
    Authenticate,
    isAdmin,
    userController.turnIntoAdministrator
);


module.exports = route;