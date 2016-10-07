///slide router, handles the routes of slides, ands also checks for a valid token
var slideRouter = function (passportConfig) {
    var express = require('express');
    var router = express.Router();
    var slideController = require('../controllers/slideController')();

    //router.use(passportConfig.isAuthenticated);
    router.route('/')
        .get(slideController.getSlides)
        .post(slideController.postSlide);

    router.route('/:slide_id')
        .get(slideController.getSlide)
        .put(slideController.putSlide)
        .delete(slideController.deleteSlide);

    return router;
};

module.exports = slideRouter;