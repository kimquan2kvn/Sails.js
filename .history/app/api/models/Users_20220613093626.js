/**
 * Users.js
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

    email:{
      type: 'string',
      required: true
    },

    password:{
      type: 'string',
      required: true
    },
    
  },
  datastores:'default'
};

// http://localhost:1337/Users/Create?firstName=kim&lastName=quan&email=kimquan2000vn&password=123456