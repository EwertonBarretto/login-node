const UserRouters = require('./users');
const PetRouters = require('./pets');
var { Router } = require('express');

const router = new Router();

router.use('/users/', UserRouters);
router.use('/pets/', PetRouters);

module.exports = router;