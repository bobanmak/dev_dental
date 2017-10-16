/**
 * Visit_status.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
    tableName: 'visit_status',
    connection: 'mysql',
    autoCreatedAt: false,
    autoUpdatedAt: false,
    attributes: {
        status_name: {
            type: 'string'
        },
        visit_status:{
            collection:'visit_status_history',
            via:'visit_status_id'
        }
    },



};
