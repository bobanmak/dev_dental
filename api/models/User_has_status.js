/**
 * User_has_status.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

    tableName: 'user_has_status',
    connection: 'mysql',
    autoCreatedAt: false,
    autoUpdatedAt: false,
    attributes: {
        status_start_time: {
            type: "datetime"
        },
        status_end_time:{
            type: "datetime"
        },
        user_account_id:{
            type:'integer',
            model:'user_account'
        },
        status_id:{
            model:'status'
        }

    }
};