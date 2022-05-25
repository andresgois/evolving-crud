const express = require("express");
const routeUser  = require("./userRoutes");
const routePost  = require('./postRoutes')

const route = express();

route.use(express.json())

route.use('/user', routeUser)

route.use('/posts', routePost)


route.use( (error, req, res, next) => {
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


module.exports = route;
