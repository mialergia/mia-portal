const Cookies = require('js-cookie');

const auth = (req, res, next) => {
    if (req.cookies.userInfo) {
        const userInfo = JSON.parse(req.cookies.userInfo);
        console.log('userInfo', userInfo);
        const roles = userInfo.roles.split(',');
        console.log('roles', roles);
        next();
    } else {
        res.redirect('/login');
    }
};

module.exports = auth;