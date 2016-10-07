//slideController, handles the varius methods of the slide object
var slideController = function () {
    'use strict';    
    var Slide = require('../models/slide');
    var postSlide = function (req, res) {
        if (!req.body.name) {
            res.status(400);
            res.send('Name is required!');
        } else {
            var slide = new Slide({
                name: req.body.name,
                content: req.body.content,
                template: req.body.template,
                startDate: req.body.startDate,
                endDate: req.body.endDate,
                bookmark: req.body.bookmark,
                displaySeconds: req.body.displaySeconds
            });
            slide.save(function (err) {
                if (err) {
                    res.status(500);
                    res.json({
                        message: 'Error while saving Slide. Error: ' + err
                    });
                } else {
                    res.status(201);
                    res.json(slide);
                }
            });


        }
    };

    var getSlides = function (req, res) {
        Slide.find(function (err, results) {
            if (err) {
                res.status(500);
                res.json({
                    message: 'Error while getting Slides. Error: ' + err
                });
            } else {
                var slides = [];
                results.forEach(function (result, index, array) {
                    var jsonSlide = result.toJSON();
                    jsonSlide.links = {
                        self: 'http://' + req.headers.host + '/api/slides/' + jsonSlide._id
                    };
                    slides.push(jsonSlide);
                });
                res.status(200);
                res.json(slides);
            }

        });
    };

    var getSlide = function (req, res) {
        // Use the Beer model to find a specific beer
        Slide.findById(req.params.slide_id, function (err, slide) {
            if (err) {
                res.status(404);
                res.json({
                    message: "Error while getting slide with id: " + req.params.slide_id + ". Error: " + err
                });
            } else {
                res.json(slide);
            }
        });
    };


    var putSlide = function (req, res) {
        // Use the Beer model to find a specific beer
        Slide.findById(req.params.slide_id, function (err, slide) {
            if (err) {
                res.status(501);
                res.json({
                    message: "Error while updating slide with id: " + req.params.slide_id + ". Error: " + err
                });
            } else {
                //update properties
                slide.name = req.body.name;
                slide.content = req.body.content;
                slide.template = req.body.template;
                slide.startDate = req.body.startDate;
                slide.endDate = req.body.endDate;
                slide.bookmark = req.body.bookmark;
                slide.displaySeconds = req.body.displaySeconds;

                slide.save(function (err) {
                    if (err) {
                        res.status(501)
                        res.send(err);
                    } else {
                        res.json(slide);
                    }
                });
            }
        });
    };

    var deleteSlide = function (req, res) {
        Slide.findById(req.params.beer_id, function (err) {
            if (err) {
                res.status(501);
                res.json({
                    message: "Error while deleting slide with id: " + req.params.slide_id + ". Error: " + err
                });
            } else {
                res.json({
                    message: 'Slide is removed!'
                });
            }
        });
    };

    return {
        postSlide: postSlide,
        getSlides: getSlides,
        getSlide: getSlide,
        putSlide: putSlide,
        deleteSlide: deleteSlide
    };
};

module.exports = slideController;