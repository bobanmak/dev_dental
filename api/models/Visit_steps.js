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
            model: 'visit'
        },
        treatment_steps_id: {
            model: 'treatment_steps'

        },
        problem_detected_id: {
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

