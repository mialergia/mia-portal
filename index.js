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

const app = express();
const port = 3000;
const DIST_DIR = path.join(__dirname, './dist');

app.use(express.static(DIST_DIR));

app.get('/', (req, res) => res.redirect(`/login`));
app.use('/login', loginRoute);
app.use('/register', registerRoute);
app.use('/reports', reportsRoute);

app.listen(port, function () {
    console.log('App listening on port: ' + port);
});
