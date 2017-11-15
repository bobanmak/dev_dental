/**
 * RoleController
 *
 * @description :: Server-side logic for managing roles
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
const _ = require ('underscore');

module.exports = {
    listRoles:function(req,res){
        Role.find().exec(function (err, roles) {
                if (err) res.serverError(err)
                res.send(roles)
        })
    }
};

