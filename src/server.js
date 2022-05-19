require('express-async-errors');
const express = require('express');
const routes = require('./routes/userRoutes');

const app = express();
app.use(express.json())

app.use(routes);

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