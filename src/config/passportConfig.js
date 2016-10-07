var passportConfig = function () {

    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    var User = require('../models/user');

    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(function (user, done) {
        done(null, user);
    });

    passport.use(new LocalStrategy({
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: false
        },
        function (username, password, callback) {
            User.findOne({
                username: username,
            }, function (err, user) {
                if (err) {
                    return callback(err);
                } else if (!user) {
                    return callback(null, false);
                } else {
                    user.verifyPassword(password, function (err, isMatch) {
                        if (err) {
                            return callback(err);
                        }
                        // Password did not match
                        if (!isMatch) {
                            return callback(null, false);
                        }
                        // Success                            
                        return callback(null, user);

                    });
                }
            });
        }));
    var isAuthenticated = function (req, res, next) {
        if (req.isAuthenticated()) {            
            res.locals.login = req.isAuthenticated();
            res.locals.user = req.user;            
            next();
        } else {
            res.redirect('/');
        }
    };
    var localOptions = {
        successRedirect: '/dashboard',
        failureRedirect: '/'
    };

    return {
        local: passport.authenticate('local', localOptions),
        isAuthenticated: isAuthenticated
    };
};

module.exports = passportConfig;