/**
 * User_account.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

    tableName: 'user_account',
    connection: 'mysql',
    autoCreatedAt: false,
    autoUpdatedAt: false,
    attributes: {
        username: {
            type: "string"
        },
        email: {
            type: "email"
        },
        firstName: {
            type: 'string'
        },
        lastName: {
            type: 'string'
        },
        address: {
            type: 'string'
        },
        city: {
            type: 'string'
        },
        country: {
            type: 'string'
        },
        phoneNumber: {
            type: 'float'
        },
        mobileNumber: {
            type: 'float'
        },
        licence: {
            type: 'integer'
        },
        password: {
            type: 'string'
        },
        password_salt: {
            type: 'string'
        },
        user_status: {
            collection: 'user_has_status',
            via: 'user_account_id'
        },
        user_role: {
            collection: 'user_has_role',
            via: 'user_account_id'
        }

    }
};

