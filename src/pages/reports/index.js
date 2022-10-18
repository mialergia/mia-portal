const router = require('express').Router();
const { View } = require('./view');

router.get('/reports', View);

module.exports = router;
