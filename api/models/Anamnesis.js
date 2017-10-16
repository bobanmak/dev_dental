/**
 * Anamnesis.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
    tableName: 'anamnesis',
    connection: 'mysql',
    autoCreatedAt: false,
    autoUpdatedAt: false,
    autoPk:false,
    attributes: {
        anamnesis_id:{
          type:'integer',
          primaryKey:true,
          unique:true
        },
        user_anamnesis_id: {
            type: 'integer',
            model:'user_has_role'
        },
        notes: {
            type: 'text'
        },
        anamnesis_catalog:{
            collection: 'anamnesis_catalog',
            via: 'anamnesis_anamnesis_id',
            through: 'visit_anamnesis'
        }


    }
};
