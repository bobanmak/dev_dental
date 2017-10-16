/**
 * Visit_anamnesis.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
    tableName: 'visit_anamnesis',
    connection: 'mysql',
    autoCreatedAt: false,
    autoUpdatedAt: false,
    autoPk:false,
    attributes: {
        anamnesis_anamnesis_id: {
            primaryKey:true,
            unique:true,
            model: 'anamnesis'
        },
        anamnesis_catalog_id: {
            primaryKey:true,
            unique:true,
            model: 'anamnesis_catalog'
           /* primaryKey:true,
           model: 'anamnesis_catalog'*/
        }

    }
};

