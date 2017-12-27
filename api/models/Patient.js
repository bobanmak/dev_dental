/**
 * User_account.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

    tableName: 'patient',
    connection: 'mysql',
    autoCreatedAt: false,
    autoUpdatedAt: false,
    attributes: {
        firstName: {
            type: 'string'
        },
        lastName: {
            type: 'string'
        },
        email: {
            type: "email"
        },
        address: {
            type: 'string'
        },
        city: {
            type: 'string'
        },
        country: {
            type: 'string'
        },
        phoneNumber: {
            type: 'float'
        },
        mobileNumber: {
            type: 'float'
        },
        identificationNumber: {
            type: 'integer'
        },
        dentist_id:{
            model:'User_account'
        }

    }
};

