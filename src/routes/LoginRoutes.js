const express = require('express');
const route = express();
const LoginController = require('@Login/controller/LoginController');

const loginController = new LoginController();

route.post('/', loginController.login);


module.exports = route;