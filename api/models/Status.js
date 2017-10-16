/**
 * Status.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

    tableName: 'status',
    connection: 'mysql',
    autoCreatedAt: false,
    autoUpdatedAt: false,
    attributes: {
        status_name: {
            type: "string"
        },
        is_user_working: {
            type: "string"
        },
        user_has_status:{
            collection: 'user_has_status',
            via: 'status_id'
        }

    }
};
