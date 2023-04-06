const Cookies = require('js-cookie');

const auth = (req, res, next) => {
    if (req.cookies.userInfo) {
        const userInfo = JSON.parse(req.cookies.userInfo);
        console.log('username', userInfo.username); // TODO: Borrar
        const roles = userInfo.roles.split(',');
        console.log('roles', roles); // TODO: Borrar
        next();
    } else {
        res.redirect('/login');
    }
};

module.exports = auth;