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
      type: 'ref', columnType: 'objectid'
      ref: 'class'
    },

    namsinh:{
      type:'string',
      required: true
    },

    tinh:{
      type:'string',
      required: true
    },

    huyen:{
      type:'string',
      required: true
    },

    xa:{
      type:'string',
      required: true
    },

    avatar:{
      type: 'string',
    },

    role:{
      type: 'string',
      required: true
    },

  },

};

