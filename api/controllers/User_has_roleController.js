/**
 * User_has_roleController
 *
 * @description :: Server-side logic for managing user_has_roles
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    create: function (req, res) {
        User_has_role.create({
            id:'3',
            NAME: 'martin',
            surname: 'mileski',
            identification_number: 'aa3dfsfdf',
            address:'sirma vojvoda',
            phone:'23',
            mail:'test@test.com'

        })
            .exec(function(err, pet) {
                if (err) { return res.serverError(err); }

                sails.log(pet);
                return res.ok();
            });
    },
    bye: function (req, res) {
        return res.redirect('http://www.sayonara.com');
    }
};