
const express = require('express');
const { getAllTours, getTourById, createTour, deleteTour, updateTour, getToursStats, getMonthlyPlan } = require('../controllers/tourController');
const { aliasTopTours } = require('../middlewares/tourMiddlewaresExmaple');

const router = express.Router();

router.route('/top-5-cheap')
   .get(aliasTopTours, getAllTours);

router.route('/tour-stats')
   .get(getToursStats);

router.route('/monthly-plan/:year')
   .get(getMonthlyPlan);

router.route('/')
   .get(getAllTours)
   .post(createTour);

router.route('/:id')
   .get(getTourById)
   .patch(updateTour)
   .delete(deleteTour);


module.exports = router;