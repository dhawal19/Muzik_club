const express = require('express');
const router  = express.Router();
const feedbackController = require('../controllers/feedbackController');

router.route('/')
    .post( feedbackController.createFeedback)
    .patch( feedbackController.updateFeedback)
    .delete( feedbackController.deleteFeedback);

module.exports = router;