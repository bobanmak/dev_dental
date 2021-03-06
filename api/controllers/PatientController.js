/**
 * PatientController
 *
 * @description :: Server-side logic for managing patients
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    create: function (req, res) {
        Patient.create({
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
    Populate: function (req, res) {
        Patient.find()
            .populate('visits')
            .exec(function (err, users) {
                if (err) {
                    return res.send(err)
                } else {
                    return res.send(users)
                }// handle error

            });
    }
};

