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
      required: true,
      unique: true,
    },

    password:{
      type: 'string',
      required: true,
      minLength: 6
    },

    role:{
      type: 'string',
      required: true
    },

    class:{
      type
    }
  },

  beforeCreate: function(values, next) {
    // Hash password
    bcrypt.hash(values.password, salt, (err, hash) => {
      if (err) {return next(err);}
      values.password = hash;
      //calling next() with an argument returns an error. Useful for canceling the entire operation if some criteria fails.
      next();
    });
  },

  validPassword: function(password, user, done) {
    bcrypt.compare(password, user.password, (err, matched)=>{
      if(err) {return err;}
      if(matched){
        return done(null,user);
      } else {
        return done(null, false,{message: 'Incorrect password.'});
      }
    });
  }
};

// http://localhost:1337/Users/Create?firstName=kim&lastName=quan&email=kimquan2000vn&password=123456
