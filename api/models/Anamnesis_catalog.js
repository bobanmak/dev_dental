/**
 * Anamnesis_catalog.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
    tableName: 'anamnesis_catalog',
    connection: 'mysql',
    autoCreatedAt: false,
    autoUpdatedAt: false,
    attributes: {
        catalog_name: {
            type: 'string'
        },
        anamnesis_type_id: {
            model:'anamnesis_type'
        },
        anamnesis_catalog:{
            collection: 'anamnesis',
            via: 'anamnesis_catalog',
            through: 'visit_anamnesis'
        }
    }
};

