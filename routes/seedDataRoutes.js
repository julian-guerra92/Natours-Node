
const express = require('express');
const { createDataTour } = require('../controllers/seedDataController');

const router = express.Router();

router.route('/')
   .get(createDataTour);

module.exports = router;