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
            model: 'patient'
        },
        dentist_id: {
            model: 'user_has_role'
        },
        visit_status:{
            collection:'visit_status_history',
            via:'visit_id'
        },
        detected_problems:{
            collection:'problem_detected',
            via:'visit_id'
        },
        visit_steps:{
            collection:'visit_steps',
            via:'visit_id'
        },
        anamnesis:{
            collection:'anamnesis',
            via:'anamnesis_id'
        }

    },

};

