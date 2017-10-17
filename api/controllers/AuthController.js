/**
 * AuthController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var bcrypt = require('bcrypt');
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
                bcrypt.compare(params.password, users[0].password).then(function(stat) {
                   if (stat==true){
                       //TODO - ADD USER ROLE AND STATUS IF AVAILABLE
                       const invalid_pass={
                           message:"succesfully logged in",
                           user_id:users.id,
                           username:users.user_name,
                           //user_role:users.role.role_id,
                           //user_status:user.status.status_id
                       };
                       return res.send(invalid_pass);
                   }else{
                       const invalid_pass={
                           message:"Incorrect password, please try again"
                       };
                       return res.send(invalid_pass);
                   }
                });
            });
    },
    logout: function (req, res) {
        return res.send('proba za logout');
    },
    signUp: function (req, res) {
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
                    return res.json('User already exists!');
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
                                    res.status(201);
                                    const response_message = {
                                        status: res.status,
                                        message: 'User created successfuly',
                                        user_id: user.id,
                                        user_name: user.user_name,
                                        user_email: user.email
                                    }
                                    res.json(response_message);
                                }
                            });
                        });
                    });

                }
            });


    }

};

