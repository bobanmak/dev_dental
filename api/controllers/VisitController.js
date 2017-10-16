/**
 * VisitController
 *
 * @description :: Server-side logic for managing visits
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    create: function (req, res) {
        Patient.find()
            .populate('visits')
            .exec(function (err, users) {
                if (err) {
                    res.send(err)
                } else {
                    res.send(users)
                }// handle error

            });
    },
    bye: function (req, res) {
        return res.redirect('http://www.sayonara.com');
    }
};

