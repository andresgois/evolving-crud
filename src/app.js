require('express-async-errors');
const express = require('express');
const { v4: uuid } = require('uuid')
const app = express();
app.use(express.json())

app.use(express.static("public"));

const users = [
    {
        id: "499c0043-89b0-4c1f-b4e9-bfb2bd310c95",
        name: "Marcio",
        age: 20
    }
];

/**
 * @api {get} /users Users
 * @apiName GetUsers
 * @apiGroup Sistema
 * 
 * @apiSuccess {String} status 200
 * 
 * @apiSuccessExample {json} Sucesso
 *    HTTP/1.1 200 OK
 *    [
 *    	{
 *    		"id": "5a8c1f1f-32ac-41a8-b52a-05b4c77de42d",
 *    		"name": "Marcio",
 *    		"age": 20
 *    	},
 *    	{
 *    		"id": "02276170-d2ce-4c83-aa19-a4df9936a9e8",
 *    		"name": "Andre",
 *    		"age": 33
 *    	}
 *    ]
 *
 */

app.get('/users', (req, res) => {
    res.json(users);
})

/**
 * @api {get} /user/:id GetUser
 * @apiName GetUser
 * @apiGroup Sistema
 * @apiParam {Number} id Users unique ID.
 * @apiSuccess {String} status 200
 * 
 * @apiSuccessExample {json} Sucesso
 *    HTTP/1.1 200 OK
 *    [
 *    	{
 *    		"id": "5a8c1f1f-32ac-41a8-b52a-05b4c77de42d",
 *    		"name": "Marcio",
 *    		"age": 20
 *    	}
 *    ]
 *
 */

 app.get('/user/:id', (req, res) => {
    var id = req.params.id;
    var user = users.find( u => u.id === id);
    if(!user){
        throw new Error("User not found!");
    }
    res.json(user);
})

/**
 * @api {post} /user CreateUser
 * @apiName createUser
 * @apiGroup Sistema
 * 
 * @apiBody {Number} id            ID of the user.
 * @apiBody {String} name          Name of the user.
 * @apiBody {Number} age           Age of the user.
 * 
 * @apiSuccessExample {json} Sucesso
 *    HTTP/1.1 201 OK
 *    [
 *    	{
 *    		"id": "5a8c1f1f-32ac-41a8-b52a-05b4c77de42d",
 *    		"name": "Marcio",
 *    		"age": 20
 *    	}
 *    ]
 *
 */
 app.post('/user', (req, res) => {
    var { name, age } = req.body;
    const user =Object.assign({}, { id: uuid(), name, age } )
    users.push(user)
    res.status(201).send();
})

/**
 * 
 * @api {put} /user/:id UpdateUser
 * @apiName UpdateUser
 * @apiGroup Sistema
 * 
 * @apiParam {Number} id           Users unique ID.
 * @apiBody {String} name          Name of the user.
 * @apiBody {Number} age           Age of the user.
 * 
 * @apiSuccessExample {json} Sucesso
 *    HTTP/1.1 200 OK
 *    [
 *    	{
 *    		"id": "5a8c1f1f-32ac-41a8-b52a-05b4c77de42d",
 *    		"name": "Marcio update",
 *    		"age": 20
 *    	}
 *    ]
 * 
 */
 app.put('/user/:id', (req, res) => {
    var id = req.params.id;
    var { name, age } = req.body;
    var user = users.find( u => u.id === id);
    var position = users.indexOf(user);

    Object.assign(users[position], { 
        name: name, 
        age: age 
    } );
    res.json(user[position]);
})

/**
 * 
 * @api {delete} /user/:id DeleteUser
 * @apiName DeleteUser
 * @apiGroup Sistema
 * 
 * @apiParam {Number} id Users unique ID.
 * 
 * @apiSuccessExample {json} Sucesso
 *    HTTP/1.1 200 OK
 *    [
 *    	{
 *    		"id": "5a8c1f1f-32ac-41a8-b52a-05b4c77de42d",
 *    		"name": "Marcio update",
 *    		"age": 20
 *    	}
 *    ]
 * 
 */
app.delete('/user/:id', (req, res) => {
    var id = req.params.id;
    var user = users.find( u => u.id === id);
    var position = users.indexOf(user);
    users.splice(position, 1)
    return res.status(200).send();
})

/**
 * Middleware de Error
 * Obs: qualquer Throw que a API dê cairá em um 404 ou 500
 */
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


/**
 * Observações gerais
 * Qualquer parâmetro passado na URL será tratado como STRING em qualquer parte da API
 * Caso você esteja usando um ID do tipo Number deverá fazer o CAST ao pegar a variável no 
 * req.params
 * Exemplo:
 * let { id } = req.params;
 * id = Number(id)
 */


app.listen(3000, () => {
    console.log('Server is running!')
})