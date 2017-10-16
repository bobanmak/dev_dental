/**
 * Problem_detected.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

    tableName: 'problem_detected',
    connection: 'mysql',
    autoCreatedAt: false,
    autoUpdatedAt: false,
    attributes: {
        tooth_id: {
            model: 'tooth'
        },
        problem_catalog_id: {
            model: 'problem_catalog'
        },
        visit_id: {
            model: 'visit'
        },
        suggested_treatment_id: {
            model: 'treatment'
        },
        selected_treatment_id: {
            model: 'treatment'
        },
        visit_steps:{
            collection:'visit_steps',
            via:'problem_detected_id'
        }

    }
};
