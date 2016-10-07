//displayRouter, handles the default get methods for the display view
var express = require('express');
var router = express.Router();
var Slide = require('../models/slide');

var displayRouter = function (passportConfig) {

    router.route('/')
        .get(function (req, res) {
            //get latest slides
            Slide.find({}, function (err, slides) {
                if (err) {
                    return res.status(500).send('Error while getting slides');
                } else {
                    res.render('display', {
                        title: 'Display',
                        message: null,
                        slides: slides
                    });
                }
            });

        });
    return router;
};

module.exports = displayRouter;