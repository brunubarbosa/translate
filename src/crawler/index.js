const express = require('express');
const router = require('express').Router();

const app = express()

router.use('/api', require('./core'));

module.exports = router