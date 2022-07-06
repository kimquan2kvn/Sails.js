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

    classroom:{
      type:'string',
    },

    birthday:{
      type:'string',
      required: true
    },

    city:{
      type:'string',
      required: true
    },

    file:{
      type:'string',
    },

    district:{
      type:'string',
      required: true
    },

    village:{
      type:'string',
      required: true
    },

    role:{
      type: 'string',
      required: true
    },

    teacher: {
      collection: 'class',
      via:'students'
    }
  },
  validParams: function(params) {
    if(!params) {
      return res.json({code: 1, message:'Params Error'});
    }
  }

  validStudent: function(name,birthday,city, district, va) {

  }
};

