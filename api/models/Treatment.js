/**
 * Treatment.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
    tableName: 'treatment',
    connection: 'mysql',
    autoCreatedAt: false,
    autoUpdatedAt: false,
    attributes: {
        treatment_name: {
            type: "text"
        },
        description: {
            type: "text"
        },
        final_step_id: {
            model: 'step'
        },
        selected_treatment:{
            colection:'problem_detected',
            via:'selected_treatment_id'
        },
        suggested_treatment:{
            colection:'problem_detected',
            via:'suggested_treatment_id'
        },
        treatment_steps:{
            collection:'treatment_steps',
            via:'treatment_id'
        }
    }
};
