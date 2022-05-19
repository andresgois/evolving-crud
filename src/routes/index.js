const express = require("express");
const route  = require("./userRoutes");

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
    }
}

module.exports = new App().server;