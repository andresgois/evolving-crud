const express = require("express");
const routeUser  = require("./userRoutes");
const routePost  = require("./routePost");

const route = express.Router();

route.use('/users', routeUser)

route.use('/posts', routePost)

module.exports = route;

/*
class App {

    constructor(){
        this.server = express();

        this.middleware();
        this.routes();
    }

    middleware(){
        // cors
        this.server.use(express.json())
    }
    
    routes(){
        this.server.use(route)
        this.server.use(routePost)
    }
}

module.exports = new App().server;*/