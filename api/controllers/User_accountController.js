/**
 * User_accountController
 *
 * @description :: Server-side logic for managing user_has_statuses
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
const jwt = require('jsonwebtoken');
const _ = require('underscore');
module.exports = {
    getSingleUser: function (req, res) {
        const params = req.params.all();
        const jwttoken = params.utoken;
        var decoded = jwt.verify(jwttoken, sails.config.api_config.secret_key);

        User_account.find({id: decoded.user_id})
            .exec(function (err, users) {
                if (err) res.serverError(err);
                const acc = {
                    user_id: users[0].id,
                    role_id: decoded.role_id,
                    username: users[0].username,
                    email: users[0].email
                };
                return res.json(acc);
            });

    },
    getAllUSers: function (req, res) {
        const params = req.params.all();
        const jwttoken = params.utoken;
        var decoded = jwt.verify(jwttoken, sails.config.api_config.secret_key);
        User_account.find().populate('user_role')
            .exec(function (err, users) {
                if (err) res.serverError(err);
                const allUsers = _.map(users, function (user) {
                    return ({
                        username: user.username,
                        user_role: user.user_role[0],
                        email: user.email
                    })
                })
                return res.json(allUsers);
            });

    },
    updateUser: function (req, res, id) {
        console.log(id);
    },
    editUserRole: function (req, res) {

    },
    deleteUser: function (req, res, id) {

    },

};

