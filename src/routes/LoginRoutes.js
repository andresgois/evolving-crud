const express = require('express');
const LoginController = require('../modulos/Login/controller/LoginController');
const route = express();

const loginController = new LoginController();

route.post('/', loginController.login);


module.exports = route;