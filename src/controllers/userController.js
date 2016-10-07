///userController, handles the post and get methods of user objects
var userController = function () {
    // Load required packages
    var User = require('../models/user');
    var postUser = function (req, res) {
        var user = new User({
            username: req.body.username,
            password: req.body.password,
            admin : false
        });

        user.save(function (err) {
            if (err) {
                res.send(err);
            } else {
                res.json({
                    message: 'New user added!'
                });
            }
        });
    };

    var getUsers = function (req, res) {
        User.find(function (err, users) {
            if (err)
                res.send(err);

            res.json(users);
        });
    };

    return {
        postUser: postUser,
        getUsers: getUsers
    }
};
module.exports = userController;