/**
 * Visit_steps.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

    tableName: 'visit_steps',
    connection: 'mysql',
    autoCreatedAt: false,
    autoUpdatedAt: false,
    attributes: {
        visit_id: {
            type: "integer",
            unique: true,
            model: 'visit'
        },
        treatment_steps_id: {
            type: "integer",
            unique: true,
            model: 'treatment_steps'

        },
        problem_detected_id: {
            type: "integer",
            unique: true,
            model: 'problem_detected'
        },
        step_time: {
            type:'datetime'
        },
        notes: {
            type:"text"
        }

    }
};

