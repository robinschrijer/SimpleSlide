//dashboardRouter, handles the default get methods for the dsshboard view
var dashboardRouter = function (passportConfig) {
    var express = require('express');
    var router = express.Router();
    //home,add usercheck   
   router.use(passportConfig.isAuthenticated);
    router.route('/')
        .get(function (req, res) {        
            res.render('dashboard', {
                title: 'Dashboard',
                message: null
            });
        });

    return router;

};

module.exports = dashboardRouter;