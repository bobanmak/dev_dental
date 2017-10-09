/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	view:function(req,res){
        User.find({}).exec(function(err,user){
            if(err){
                    res.send(500, {error: "DB Error"});
            }
            res.view("view",{user:user});
 
            });

    },
    singleview: function(req,res){
        User.findOne({id:req.params.id}).exec(function(err,user){
            if(err){
                res.send(500, {error:"DB Error"});
            }

            res.view("singleview",{user:user});
        });

    },
};

