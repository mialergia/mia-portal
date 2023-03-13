const express = require('express');
const path = require('path');

require('@babel/register')({
    ignore: ['node_modules'],
    plugins: [
        [
            'babel-plugin-transform-require-ignore',
            {
                extensions: ['.scss'],
            },
        ],
    ],
});
require.extensions['.jpg'] = () => { };
require.extensions['.jpeg'] = () => { };
require.extensions['.gif'] = () => { };
require.extensions['.png'] = () => { };
require.extensions['.svg'] = () => { };

const loginRoute = require('./src/pages/login');
const registerRoute = require('./src/pages/registerUser');
const reportsRoute = require('./src/pages/reports');
const patientsRoute = require('./src/pages/patients');

const app = express();
const port = 3000;
const DIST_DIR = path.join(__dirname, './dist');

app.use('/login', (req, res, next) => {
    console.log('Request URL:', req.originalUrl);
    next();
}, loginRoute);
app.use('/register', registerRoute);
app.use('/reports', reportsRoute);
app.use('/patients', patientsRoute);

app.use('/', (req, res) => res.redirect(`/login`));

app.listen(port, function () {
    console.log('App listening on port: ' + port);
});
