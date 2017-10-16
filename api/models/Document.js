/**
 * Document.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
    tableName: 'document',
    connection: 'mysql',
    autoCreatedAt: false,
    autoUpdatedAt: false,
    attributes: {
        description: {
            type: "text"
        },
        location:{
          type:'string'
        },
        patient_id:{
          model:'patient'
        }
    }
};

