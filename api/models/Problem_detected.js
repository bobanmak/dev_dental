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
            type: "integer",
            unique: true,
            model: 'tooth'
        },
        problem_catalog_id: {
            type: "integer",
            unique: true,
            model: 'problem_catalog'
        },
        visit_id: {
            type: "integer",
            unique: true,
            model: 'visit'
        },
        suggested_treatment_id: {
            type:'integer',
            unique: true,
            model: 'treatment'
        },
        selected_treatment_id: {
            type:"integer",
            unique: true,
            model: 'treatment'
        }

    }
};
