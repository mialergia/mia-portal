const router = require('express').Router();
const { View } = require('./view');

router.get('/', View);

module.exports = router;
