/**
 * Student.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    hoten:{
      type: 'string',
      required: true
    },

    lop:{
      type: 'string',

    },

    namsinh:{
      type:'string',

    },

    tinh:{
      type:'string',

    },

    huyen:{
      type:'string',

    },

    xa:{
      type:'string',

    },

    file:{
      type: 'string',
    },
       
    role:{
      type: 'string',
      required: true
    },

  },

};

