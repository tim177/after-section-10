/* eslint-disable import/no-useless-path-segments */
const express = require('express');
const tourController = require('../controllers/tourController');
const authController = require('../controllers/authController');
//todo ROUTE FOR TOURS
const router = express.Router();

router
  .route('/')
  .get(tourController.getAllTours)
  .post(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.createTour,
  );
router
  .route('/:id')
  .get(tourController.getTour)
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    // tourController.uploadTourImages,
    // tourController.resizeTourImages,
    // tourController.updateTour,
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.deleteTour,
  );

module.exports = router;
