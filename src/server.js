require('dotenv').config();
require('module-alias/register')
require('express-async-errors');
const app = require('./routes')
const config = require('@config');

app.use(express.json())

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

app.listen(config.app.port, () => {
    console.log('Server is running!')
})