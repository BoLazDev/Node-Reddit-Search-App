const express = require('express');
const { redditSearch } = require('../controllers/redditController');
const router = express.Router();

router.post('/', redditSearch);

module.exports = router;