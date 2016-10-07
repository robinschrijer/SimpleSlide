//userRoute, handels the get and post methods for user objects
var userRoute = function (passportConfig) {
    var express = require('express');
    var router = express.Router();
    var userController = require('../controllers/userController')();

    router.use(passportConfig.isAuthenticated);
    router.route('/')
        .get(userController.getUsers)
        .post(userController.postUser);
    return router;
};

module.exports = userRoute;