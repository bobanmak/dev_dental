/**
 * PatientController
 *
 * @description :: Server-side logic for managing Patient in the application
 *
 */
const jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
const saltRounds = 10;
const _ = require('underscore');
module.exports = {
    /**
     * @function :: getSingleAccount
     *
     * @description :: Retrives all data from the given patient id
     * @param :: {number} id
     * @returns :: {object} acc
     */
    getSinglePatient: function (req, res) {
        const params = req.params.all();
        Patient.find({id: params.id})
            .exec(function (err, patients) {
                if (err) res.serverError(err);
                return res.json(patients);
            });

    },

    /**
     * @function :: getAllPatients
     *
     * @description :: Retrives all data from all patients
     * @param :: {object}
     * @returns :: {object} allPatients
     */
    getAllPatients: function (req, res) {
        const params = req.params.all();
        if(!params.dentist_id){
            res.status(400)
            return res.json({
                status:400,
                message: 'Please provide dentist  id and try again!'
            });
        }
        Patient.find({dentist_id:params.dentist_id})
            .exec(function (err, patients) {
                if (err) res.serverError(err);
                const allPatients = _.map(patients, function (patient) {
                    return (patient)
                })
                return res.json(allPatients);
            });

    },
    /**
     * @function :: createPatient
     *
     * @description :: Will create new patient and the corresponding role for it and store it to the database
     * @param :: {object}
     * @returns :: {object} allPatients
     */
    createPatient: function (req, res) {
        //signup parameters
        const {values} = req.params.all();
        Patient.find({email: values.email})
            .exec(function (err, patients) {
                if (err) {
                    return res.negotiate(err);
                }
                if (patients.length) {
                    res.status(400)
                    return res.json({
                        status:400,
                        message: 'Patient already exists!'
                    });
                } else {

                    //create password salt and hash and store data in database
                    bcrypt.genSalt(saltRounds, function (err, salt) {
                        bcrypt.hash(values.password, salt, function (err, hash) {
                            const patient_acc = {
                                email: values.email,
                                firstName: values.firstName,
                                lastName: values.lastName,
                                address: values.address,
                                city: values.city,
                                country: values.country,
                                phoneNumber: values.phoneNumber,
                                mobileNumber: values.mobileNumber,
                                identificationNumber: values.identificationNumber,
                                password: hash,
                                password_salt: salt,
                            }
                            Patient.create(patient_acc, function (err, patient) {
                                if (err) {
                                    res.status(500)
                                    return res.json({
                                        status: 500,
                                        message: err.message,
                                    });
                                } else {

                                    return res.json({
                                        status:200,
                                        message: "Patient was successfully created"
                                    });

                                }
                            });
                        });
                    });

                }
            });
    },

    /**
     * @function :: updatePatient
     *
     * @description :: Will update the patient with specific given id and store it to the database
     * @param :: {string} id
     * @param :: {object} patientInfo
     * @returns :: {object}
     */

    updatePatient: function (req, res) {
        const patientId = req.params.id;
        const {values} = req.params.all();
        bcrypt.genSalt(saltRounds, function (err, salt) {
            bcrypt.hash(values.password, salt, function (err, hash) {
                const updatedPatient = {
                    email: values.email,
                    firstName: values.firstName,
                    lastName: values.lastName,
                    address: values.address,
                    city: values.city,
                    country: values.country,
                    phoneNumber: values.phoneNumber,
                    mobileNumber: values.mobileNumber,
                    identificationNumber: values.identificationNumber,
                    password: hash,
                    password_salt: salt,
                }
                Patient.update({id: patientId}, updatedPatient).exec(function afterwards(err, updated) {

                    if (err) {
                        res.status(500)
                        return res.json({
                            status: 500,
                            message: err.message,
                        });
                    }
                    return res.json({
                        status: 200,
                        message: 'Patient was successfully updated',
                    });
                });
            })
        })

    },

    /**
     * @function :: deletePatient
     *
     * @description :: Will delete patient with specific given id and the role associated with that patient
     * @param :: {string} id
     * @param :: {object} patientInfo
     * @returns :: {object}
     */

    deletePatient: function (req, res) {
        //signup parameters
        const params = req.params.all();
            Patient.destroy({id: params.id}).exec(function (err) {
                if (err) return res.negotiate(err);
                return res.json({
                    status: 200,
                    message: "patient with id " + params.id + " successfuly removed"
                })
            })


    },

};

