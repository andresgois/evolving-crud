require('dotenv').config();
require('module-alias/register')
require('express-async-errors');
const app = require('./routes')
const config = require('@config');

const PORT = Number(config.app.port);

app.listen(PORT, () => {
    console.log('Server is running!'+typeof config.app.port)
})