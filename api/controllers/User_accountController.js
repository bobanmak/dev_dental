/**
 * User_accountController
 *
 * @description :: Server-side logic for managing user_accounts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    view: function (req, res) {
        User_account.find(1)
            .populate('user_role')
            .exec(function (err, users) {
                if (err) {
                    return res.send(err);
                } else {
                    return res.send(users);
                }
            });
    }
   /* create:function (req, res) {

        return res.send('oks');
    }*/
};

