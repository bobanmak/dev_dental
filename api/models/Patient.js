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
    autoPK: false,
    attributes: {
        id:{
            type: 'integer',
            autoIncrement: true,
            primaryKey: true,
            unique: true
        },
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
        },
        documents:{
            collection:'document',
            via:'patient_id'
        }
    },



};

