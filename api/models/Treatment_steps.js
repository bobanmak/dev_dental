/**
 * Treatment_steps.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

    tableName: 'treatment_steps',
    connection: 'mysql',
    autoCreatedAt: false,
    autoUpdatedAt: false,
    attributes: {
        treatment_id: {
            model: 'treatment'
        },
        step_id: {
            model:'step'

        },
        step_order: {
            type: 'integer'
        },
        visit_steps:{
            collection:'visit_steps',
            via:'treatment_steps_id'
        }
    }
};
