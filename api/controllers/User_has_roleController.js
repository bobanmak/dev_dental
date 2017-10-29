/**
 * User_has_roleController
 *
 * @description :: Server-side logic for managing user_has_roles
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    index:function(req,res){
        User_has_role
            .find()
            .exec((err,users_role)=> {
                if(err){ return res.send(err)};
                return res.send(users_role);
            });
        },
    create:function(req,res){
            const params= req.params.all();
            User_has_role
                .create(params)
                .exec((err,result)=>{
                if(err){
                    res.status(401);
                    return res.send({
                        status:res.status,
                        message: err
                    })
                }
                res.status(201);
            return res.send({
                status:res.status,
                message:"User role succesfully added"
            });
        })
    },

    update:function(req,res){
        const params= req.params.all();

        if (!params.id) return res.send("No id specified.",500);

        User_has_role
            .update(params.id , {user_account_id : params.user_account_id,role_id: params.role_id })
            .exec( function afterwards(err, updated)  {
            return res.send(updated)
        })
    },
    destroy:function(req,res){

    }

};