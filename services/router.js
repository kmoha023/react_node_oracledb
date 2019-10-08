const express = require('express');
const router = new express.Router();
const data = require('../controllers/data.js');

router.route('/host_name/:host_name?')
    .get(data.get);

module.exports = router;