//slidesViewRouter, handles the default get methods for the slides views, not api
var slidesViewRouter = function (passportConfig) {
    var express = require('express');
    var router = express.Router();
    router.use(passportConfig.isAuthenticated);
    router.route('/')
        .get(function (req, res) {
            res.render('slides', {
                title: 'Slides',
                message: null
            });
        });

    return router;
};

module.exports = slidesViewRouter;