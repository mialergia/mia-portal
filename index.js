const express = require('express');
const cookieParser = require('cookie-parser');

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

app.use(express.static('dist'));
app.use(cookieParser());

app.use((req, res, next) => {
    next();
});

app.use('/login', (req, res, next) => { 
    next();
}, loginRoute);
app.use('/register', registerRoute);
app.use('/reports', reportsRoute);
app.use('/patients', patientsRoute);

app.use('/', (req, res) => res.redirect(`/login`));

app.listen(port, function () {
    console.log('App listening on port: ' + port);
});
