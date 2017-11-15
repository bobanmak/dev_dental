/**
 * User_has_role.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

    tableName: 'user_has_role',
    connection: 'mysql',
    autoCreatedAt: false,
    autoUpdatedAt: false,
    attributes: {
        role_start_time: {
            type: "datetime"
        },
        role_end_time:{
            type: "datetime"
        },
        user_account_id:{
            type:'integer',
            model:'user_account'
        },
        role_id:{
            type:'integer',
            model:'role',
            unique:true
        },
        visits:{
            collection:'visit',
            via:'dentist_id'
        }

    }
};

