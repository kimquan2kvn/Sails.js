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

  beforeCreate: function(values, next) {
    // Hash password
      bcrypt.hash(values.password, salt, function(err, hash) {
        if (err) return next(err);
        values.password = hash;
        //calling next() with an argument returns an error. Useful for canceling the entire operation if some criteria fails.
        next();
    });
  },

};

// http://localhost:1337/Users/Create?firstName=kim&lastName=quan&email=kimquan2000vn&password=123456