require('express-async-errors');
const express = require('express');
const app = express();
app.use(express.json())

const users = [
    {
        id: 2,
        name: "Marcio",
        age: "20"
    }
];

app.get('/', (req, res) => {
    res.json({msg: 'OK'});
})

app.get('/users', (req, res) => {
    res.json(users);
})

app.get('/user/:id', (req, res) => {
    var id = req.params.id;
    var user = users.find( u => u.id === Number(id));
    if(!user){
        throw new Error("User not found!");
    }
    res.json(user);
})

app.post('/user', (req, res) => {
    var { id, name, age } = req.body;
    var user = {};

    Object.assign(user, { id, name, age } )
    users.push(user)
    res.status(201).send();
})

app.put('/user/:id', (req, res) => {
    var id = req.params.id;
    var { name, age } = req.body;
    var user = users.find( u => u.id === Number(id));
    var position = users.indexOf(user);

    Object.assign(users[position], { 
        name: name, 
        age: age 
    } );
    res.json(user[position]);
})

app.delete('/user/:id', (req, res) => {
    var id = req.params.id;
    var user = users.find( u => u.id === Number(id));
    var position = users.indexOf(user);
    users.splice(position, 1)
    return res.status(200).send();
})

app.use( (error, req, res, next) => {
    if( error instanceof Error){
        return res.status(404).json({
            status: 'error',
            message: `${error.message}`,
        })
    }

    return res.status(500).json({
        status: 'error',
        message: `Internal server error - ${error.message}`,
    })
    //next(error);
})

app.listen(3000, () => {
    console.log('Server is running!')
})