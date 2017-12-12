/**
 * User_accountController
 *
 * @description :: Server-side logic for managing Dentist in the application
 *
 */
const jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
const saltRounds = 10;
const _ = require('underscore');
module.exports = {
    /**
     * @function :: getSingleAccount
     *
     * @description :: Retrives all data from the given user id
     * @param :: {number} id
     * @returns :: {object} acc
     */
    getSingleAccount: function (req, res) {
        const params = req.params.all();
        const decoded = req.session.tokenData;
        User_account.find({id: params.id})
            .exec(function (err, users) {
                if (err) res.serverError(err);
                const acc = {
                    id: users[0].id,
                    role_id: decoded.role_id,
                    username: users[0].username,
                    email: users[0].email,
                    firstName: users[0].firstName,
                    lastName: users[0].lastName,
                    address: users[0].address,
                    city: users[0].city,
                    country: users[0].country,
                    phoneNumber: users[0].phoneNumber,
                    mobileNumber: users[0].mobileNumber,
                    licence: users[0].licence,
                    licenceNumber: users[0].licenceNumber
                };
                return res.json(acc);
            });

    },

    /**
     * @function :: getAllUsers
     *
     * @description :: Retrives all data from all users
     * @param :: {object}
     * @returns :: {object} allUsers
     */
    getAllUsers: function (req, res) {
        User_account.find().populate('user_role')
            .exec(function (err, users) {
                if (err) res.serverError(err);
                const allUsers = _.map(users, function (user) {
                    return ({
                        id: user.id,
                        username: user.username,
                        email: user.email,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        address: user.address,
                        city: user.city,
                        country: user.country,
                        phoneNumber: user.phoneNumber,
                        mobileNumber: user.mobileNumber,
                        licence: user.licence,
                        user_role: user.user_role[0]
                    })
                })
                return res.json(allUsers);
            });

    },
    /**
     * @function :: createUser
     *
     * @description :: Will create new user and the corresponding role for it and store it to the database
     * @param :: {object}
     * @returns :: {object} allUsers
     */
    createUser: function (req, res) {
        //signup parameters
        const {values} = req.params.all();
        User_account.find({email: values.email})
            .exec(function (err, users) {
                if (err) {
                    return res.negotiate(err);
                }
                if (users.length) {
                    res.status(400);
                    return res.json({mesage: 'User already exists!'});
                } else {

                    //create password salt and hash and store data in database
                    bcrypt.genSalt(saltRounds, function (err, salt) {
                        bcrypt.hash(values.password, salt, function (err, hash) {
                            const user_acc = {
                                username: values.username,
                                email: values.email,
                                firstName: values.firstName,
                                lastName: values.lastName,
                                address: values.address,
                                city: values.city,
                                country: values.country,
                                phoneNumber: values.phoneNumber,
                                mobileNumber: values.mobileNumber,
                                licence: values.licence,
                                password: hash,
                                password_salt: salt,
                            }

                            User_account.create(user_acc, function (err, user) {
                                if (err) {
                                    return res.negotiate(err);
                                } else {

                                    const roles = {
                                        user_account_id: user.id,
                                        role_id: values.role
                                    }
                                    User_has_role.create(roles, function (err, roles) {
                                        if (err) {
                                            return res.negotiate(err);
                                        }

                                        const response_message = {
                                            user_id: user.id,
                                            role_id: roles.role_id,
                                            username: user.username,
                                            email: user.email
                                        }
                                        var token = jwt.sign(response_message, sails.config.api_config.secret_key);
                                        return res.json({
                                            message: "Dentist was successfully created",
                                            logged_in: true,
                                            user_id: user.id,
                                            role_id: roles.role_id,
                                            message: "User created successfully.You can now login",
                                            logged_in: true,
                                            token: token
                                        });
                                    })

                                }
                            });
                        });
                    });

                }
            });
    },

    /**
     * @function :: updateUser
     *
     * @description :: Will update the user with specific given id and store it to the database
     * @param :: {string} id
     * @param :: {object} userInfo
     * @returns :: {object}
     */

    updateUser: function (req, res) {
        const userId = req.params.id;
        const {values} = req.params.all();
        bcrypt.genSalt(saltRounds, function (err, salt) {
            bcrypt.hash(values.password, salt, function (err, hash) {
                const updatedUser = {
                    username: values.username,
                    email: values.email,
                    firstName: values.firstName,
                    lastName: values.lastName,
                    address: values.address,
                    city: values.city,
                    country: values.country,
                    phoneNumber: values.phoneNumber,
                    mobileNumber: values.mobileNumber,
                    licence: values.licence,
                    password: hash,
                    password_salt: salt,
                }
                User_account.update({id: userId}, updatedUser).exec(function afterwards(err, updated) {

                    if (err) {
                        return res.negotiate(err);
                    }
                    User_has_role.update({user_account_id: userId}, {role_id: values.role}).exec(function afterwards(err, updated) {
                        if (err) {
                            return res.negotiate(err);
                        }

                        return res.json({
                            message: 'Dentist was successfully updated',
                            status: 200
                        });
                    })

                });
            })
        })

    },

    /**
     * @function :: deleteUser
     *
     * @description :: Will delete user with specific given id and the role associated with that user
     * @param :: {string} id
     * @param :: {object} userInfo
     * @returns :: {object}
     */

    deleteUser: function (req, res) {
        //signup parameters
        const params = req.params.all();
        User_has_role.destroy({user_account_id: params.id}).exec(function (err) {
            if (err) return res.negotiate(err);
            User_account.destroy({id: params.id}).exec(function (err) {
                if (err) return res.negotiate(err);
                return res.json({
                    status: 200,
                    message: "user with id " + params.id + " successfuly removed"
                })
            })
        })

    },

};

