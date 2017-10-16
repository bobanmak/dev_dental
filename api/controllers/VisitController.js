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
            .exec(function(err, users) {
                if(err) {
                    res.send(err)
                }else{
                    res.send(users)
                }// handle error


                // The users object would look something like the following
                // [{
                //   id: 123,
                //   firstName: 'Foo',
                //   lastName: 'Bar',
                //   pets: [{
                //     id: 1,
                //     breed: 'labrador',
                //     type: 'dog',
                //     name: 'fido',
                //     user: 123
                //   }]
                // }]
                    });
    },
    bye: function (req, res) {
        return res.redirect('http://www.sayonara.com');
    }
};

