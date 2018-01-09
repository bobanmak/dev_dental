/**
 * AuthController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');
let _ = require ('underscore')
module.exports = {
    login: function (req, res) {
        const params = req.params.all();

        User_account.find({
            or: [
                {email: params.email}
            ]
        }).populate('user_role')
            .exec(function (err, users) {
                if (err) {
                    res.status(401);
                    return res.serverError(err)
                }
                if (users.length <= 0) {
                    res.status(200);
                    return res.send(
                        {
                            status: res.status,
                            message: "User with this email not found, please try again",
                            logged_in:false
                        }
                    );
                }
                bcrypt.compare(params.password, users[0].password).then((stat) => {
                    if (stat == true) {
                        let roles=[]
                        _.map(users[0].user_role, function(role){
                            switch (role.role_id){
                                case 1:
                                    roles.push('isAdmin')
                                    break;
                                case 2:
                                    roles.push('isDentist')
                                    break;
                                case 3:
                                    roles.push('isUser')
                                    break;
                            }

                        });
                        const logged_in = {
                            user_id: users[0].id,
                            roles: roles,
                            username: users[0].username,
                            email: users[0].email
                            //user_status:user.status.status_id
                        };
                        let token = jwt.sign(logged_in, sails.config.api_config.secret_key);

                        return res.send({
                            message: "Dentist was successfully logged in",
                            logged_in: true,
                            user_data:{
                                user_id: users[0].id,
                                roles: roles,
                                firstName: users[0].firstName,
                                lastName: users[0].lastName,
                                email: users[0].email,
                                licence: users[0].licence
                            },
                            token: token
                        });

                    } else {
                        const invalid_pass = {
                            message: "Incorrect password, please try again",
                            logged_in:false
                        };
                        return res.send(invalid_pass);
                    }
                });
            });
    },
    logout: function (req, res) {
       
    },

    getToken: function (req, res) {
        const params = req.params.all();
        const decoded = jwt.verify(params.utoken, sails.config.api_config.secret_key);
        return res.json(decoded);
    }


};

