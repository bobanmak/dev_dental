/**
 * Visit_status_history.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
    tableName: 'visit_status_history',
    connection: 'mysql',
    autoCreatedAt: false,
    autoUpdatedAt: false,
    attributes: {
        status_time: {
            type: 'datetime'
        },
        visit_status_id: {
            model: 'visit_status'
        },
        visit_id: {
            model: 'visit'
        }
    },



};
