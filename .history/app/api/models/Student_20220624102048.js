/**
 * Student.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name:{
      type: 'string',
      required: true
    },

    class:{     
      collection: 'class',
      via: 'teacher'
    },

    Year of Birth:{
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

