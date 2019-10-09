const express = require('express');
const router = new express.Router();
const data = require('../controllers/data.js');

router.route('/host_name/:host_name?')
    .get(data.get);
router.route('/database_name/:database_name?')
    .get(data.get);
router.route('/application_name/:application_name?')
    .get(data.get);

module.exports = router;