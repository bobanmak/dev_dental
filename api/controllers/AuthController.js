/**
 * AuthController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const saltRounds = 10;
module.exports = {
    login: function (req, res) {
        const params = req.params.all();

        User_account.find({
                or: [
                    {email: params.email}
                ]
            })
            .exec(function (err, users) {
                if (err) {

                    res.status(401);
                    return res.send(err)
                }
                if (users.length<=0) {
                    res.status(200);
                    return res.send(
                        {
                            status:res.status,
                            message:"User with this email not found, please try again"
                        }
                    );
                }
                bcrypt.compare(params.password, users[0].password).then((stat)=> {
                    if (stat == true) {
                        req.session.authenticated = true;
                        //TODO - ADD USER ROLE AND STATUS IF AVAILABLE
                        const logged_in = {
                            user_id: users[0].id,
                            username: users[0].user_name,
                            //user_role:users.role.role_id,
                            //user_status:user.status.status_id
                        };
                        let token = jwt.sign(logged_in, sails.config.api_config.secret_key);

                         return res.send({message:"succesfully loged in",logged_in:true,username:users[0].user_name,token:token});


                    } else {
                        const invalid_pass = {
                            message: "Incorrect password, please try again"
                        };
                        return res.send(invalid_pass);
                    }
                });
            });
    },
    logout: function (req, res) {
        const params = req.params.all();
        var decoded = jwt.verify(params.token, sails.config.api_config.secret_key);
        return res.send(decoded);
    },
    register: function (req, res) {
        //signup parameters
        const params = req.params.all();
        User_account.find({
            or: [
                {email: params.email}
            ]
        })
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
                        bcrypt.hash(params.password, salt, function (err, hash) {
                            const user_acc = {
                                user_name: params.username,
                                email: params.email,
                                password: hash,
                                password_salt: salt
                            }
                            User_account.create(user_acc, function (err, user) {
                                if (err) {
                                    return res.negotiate(err);
                                } else {
                                    /* TODO
                                       assign role depending on the
                                     */
                                    const roles={
                                        user_account_id:user.id,
                                        role_id:3
                                    }
                                    User_has_role.create(roles, function (err, roles) {
                                        if (err){
                                            return res.negotiate(err);
                                        }

                                        const response_message = {
                                            user_id: user.id,
                                            role_id: roles.role_id,
                                            user_name: user.user_name,
                                        }
                                        var token = jwt.sign(response_message, sails.config.api_config.secret_key);
                                        return res.json({message:"User created successuly.You can now login",logged_in:true,username:user.username,token:token} );
                                    })

                                }
                            });
                        });
                    });

                }
            });


    }

};

