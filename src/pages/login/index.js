const router = require('express').Router();
const { View } = require('./view');

router.get('/login', View);

module.exports = router;
