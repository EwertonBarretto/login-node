const UserRouters = require('./users');
var { Router } = require('express');

const router = new Router();

router.use('/users/', UserRouters);

module.exports = router;