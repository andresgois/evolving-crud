const express = require('express');
const route = express.Router();

const UserController = require('../controller/UserController');
const userController = new UserController();

route.get('/users', (req,res) => {
    const users = userController.index()
    return res.json(users);
});

route.get('/user/:id', (req,res) => {
    var id = req.params.id;
    const user = userController.indexOne(id)
    return res.json(user);
});

route.post('/user', (req,res) => {
    var { name, age } = req.body;
    
    userController.store(name, age);
    return res.status(201).send()
});

route.put('/user/:id', (req,res) => {
    var id = req.params.id;
    var { name, age } = req.body;
    
    const user = userController.update(id, name, age);
    return res.status(204).json(user);
});

route.delete('/user/:id', (req,res) => {
    var id = req.params.id;
    userController.delete(id);
    return res.send();
});

module.exports = route;