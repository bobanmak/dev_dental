/**
 * Visit.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

    tableName: 'visit',
    connection: 'mysql',
    autoCreatedAt: false,
    autoUpdatedAt: false,
    attributes: {
        visit_date: {
            type: 'datetime'
        },
        patient_id: {
            type: 'integer',
            model: 'patient'
        },
        dentist_id:{
          type:'integer'
        }
    },

};

