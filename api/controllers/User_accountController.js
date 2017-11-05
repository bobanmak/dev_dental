/**
 * User_accountController
 *
 * @description :: Server-side logic for managing user_has_statuses
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var jwt = require('jsonwebtoken');

module.exports = {
    index:function(req,res){
        const params = req.params.all();
        const jwttoken = params.utoken;
        var decoded = jwt.verify(jwttoken, sails.config.api_config.secret_key);
        User_account.find({id:decoded.user_id})
            .exec(function(err, users) {
                if(err)res.serverError(err);

               const  acc={
                    user_id:users[0].id,
                    role_id:decoded.role_id,
                    username:users[0].user_name,
                    email:users[0].email
                };
                    return res.json(acc);
                    });

    }

};

