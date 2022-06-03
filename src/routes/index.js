const express = require("express");
const routeUser  = require("./userRoutes");
const routePost  = require('./postRoutes')
const routeLogin  = require('./LoginRoutes')
const errors = require('@Middleware/errors')

const route = express();

route.use(express.json())

route.use('/user', routeUser)

route.use('/login', routeLogin)

route.use('/posts', routePost)

route.use(errors)

module.exports = route;
