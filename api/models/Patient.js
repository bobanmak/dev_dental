/**
 * Patient.js
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
        NAME: {
            type: 'string'
        },
        surname: {
            type: 'string'
        },
        identification_number: {
            type: 'string'
        },
        address: {
            type: 'string'
        },
        phone: {
            type: 'int'
        },
        mail: {
            type: 'string'
        },
        visits: {
            collection: 'visit',
            via: 'patient_id'
        }
    },



};

