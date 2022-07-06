/**
 * Users.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
module.exports = {

  attributes: {
    firstName:{
      type: 'string',
      required: true
    },

    lastName:{
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
    }
  },
};

// http://localhost:1337/Users/Create?firstName=kim&lastName=quan&email=kimquan2000vn&password=123456