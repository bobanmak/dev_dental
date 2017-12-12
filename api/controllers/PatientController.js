/**
 * PatientController
 *
 * @description :: Server-side logic for managing Patients in the application
 *
 */

const _ = require('underscore');
module.exports = {
    /**
     * @function :: getSinglePatient
     *
     * @description :: Retrives all data from the given patient id
     * @param :: {number} id
     * @returns :: {object} singlePatientData
     */
    getSinglePatient: function (req, res) {
        const params = req.params.all();
        const decoded = req.session.tokenData;
        Patient.find({id: params.id})
            .exec(function (err, users) {
                if (err) res.serverError(err);
                const singlePatientData = {
                    id: users[0].id,
                    email: users[0].email,
                    firstName: users[0].firstName,
                    lastName: users[0].lastName,
                    address: users[0].address,
                    city: users[0].city,
                    country: users[0].country,
                    phoneNumber: users[0].phoneNumber,
                    mobileNumber: users[0].mobileNumber,
                    identificationNumber: users[0].identificationNumber
                };
                return res.json(singlePatientData);
            });

    },

    /**
     * @function :: getAllPatients
     *
     * @description :: Retrives all data from all users
     * @param :: {object}
     * @returns :: {object} allPatientData
     */
    getAllPatients: function (req, res) {
        Patient.find().exec(function (err, patients) {
            if (err) res.serverError(err);
            const allPatientData = _.map(patients, function (patient) {
                return ({
                    id: patient.id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    address: user.address,
                    city: user.city,
                    country: user.country,
                    phoneNumber: user.phoneNumber,
                    mobileNumber: user.mobileNumber,
                    identificationNumber: values.identificationNumber,
                })
            })
            return res.json(allPatientData);
        });

    },
    /**
     * @function :: createPatient
     *
     * @description :: Will create new patient store it to the database
     * @param :: {object}
     * @returns :: {object} allPatients
     */
    createPatient: function (req, res) {
        //signup parameters

    },

    /**
     * @function :: updateUser
     *
     * @description :: Will update the patient with specific given id and store it to the database
     * @param :: {string} id
     * @param :: {object} patientInfo
     * @returns :: {object}
     */

    updateUser: function (req, res) {
        const userId = req.params.id;
        const {values} = req.params.all();
        bcrypt.genSalt(saltRounds, function (err, salt) {
            bcrypt.hash(values.password, salt, function (err, hash) {
                const updatedUser = {
                    username: values.username,
                    email: values.email,
                    firstName: values.firstName,
                    lastName: values.lastName,
                    address: values.address,
                    city: values.city,
                    country: values.country,
                    phoneNumber: values.phoneNumber,
                    mobileNumber: values.mobileNumber,
                    licence: values.licence,
                    password: hash,
                    password_salt: salt,
                }
                User_account.update({id: userId}, updatedUser).exec(function afterwards(err, updated) {

                    if (err) {
                        return res.negotiate(err);
                    }
                    User_has_role.update({user_account_id: userId}, {role_id: values.role}).exec(function afterwards(err, updated) {
                        if (err) {
                            return res.negotiate(err);
                        }

                        return res.json({
                            message: 'Dentist was successfully updated',
                            status: 200
                        });
                    })


                });
            })
        })

    },

    /**
     * @function :: deletePatient
     *
     * @description :: Will delete user with specific given id and the role associated with that user
     * @param :: {string} id
     * @param :: {object} patientInfo
     * @returns :: {object} deletePatientResponse
     */

    deletePatient: function (req, res) {
        //signup parameters
        const params = req.params.all();
        User_has_role.destroy({user_account_id: params.id}).exec(function (err) {
            if (err) return res.negotiate(err);
            User_account.destroy({id: params.id}).exec(function (err) {
                if (err) return res.negotiate(err);
                return res.json({
                    status: 200,
                    message: "user with id " + params.id + " successfuly removed"
                })
            })
        })

    },

};

