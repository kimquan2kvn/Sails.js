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

    birthday:{
      type:'string',
      required: true
    },

    city:{
      type:'string',
      required: true
    },

    district:{
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

