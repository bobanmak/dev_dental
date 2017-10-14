/**
 * Vanamnesis.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

    tableName: 'anamnesis',
    connection: 'mysql',
    autoCreatedAt: false,
    autoUpdatedAt: false,
    autoPK: false,
    attributes: {
        user_anamnesis_id: {
            type: 'integer'
        },
        notes: {
            type: 'text'
        },
        anamnesis_id: {
            type: 'integer',
            primaryKey:true,
            unique:true,
            model:'visit'
        }
    },
};

