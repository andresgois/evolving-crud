require('dotenv').config();
require('module-alias/register')
require('express-async-errors');
const app = require('./routes')
const config = require('@config');

app.listen(config.app.port, () => {
    console.log('Server is running!')
})