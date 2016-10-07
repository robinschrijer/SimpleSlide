///loginRouter, handles the post methods for autorisation, example: login
var loginRouter = function (passportConfig) {
    var express = require('express');
    var router = express.Router();
    router.route('/')
        .post(passportConfig.local)         
        .get(function (req, res) {            
            if (req.query.messageType && req.query.messageText) {
                res.render('index', {
                    title: 'Inloggen',
                    message: message = {
                        text: req.query.messageText,
                        messageType: req.query.messageType
                    },
                    user : null
                });
            } else {
                res.render('index', {
                    title: 'Inloggen',
                    message: null,
                    user : null
                });
            }
        });

    return router;

};

module.exports = loginRouter;