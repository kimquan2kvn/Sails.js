/**
 * Users.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
// var db = require('sails-mongo');
// const {Schema} = db;

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

  },

  beforeCreate: function(values, next) {
    bcrypt.hash(values.password, salt, (err, hash) => {
      if (err) {return next(err);}
      values.password = hash;
      next();
    });
  },

  validPassword: function(password, user, done) {
    bcrypt.compare(password, user.password, (err, matched)=>{
      if(err) {return err;}
      if(matched){
        return done(null,user);
      } else {
        return done(null, false,{code:1, message: 'Incorrect password.'});
      }
    });
  },

  validRegister: function(firstName,lastName,email,password,passwordConfirm) {
    if (!firstName) {
      return res.json({code: 1 , message:'Enter Firstname'});
    }
    if (!lastName) {
      return res.json({code: 1 , message:'Enter Lastname'});
    }
    if (!email) {
      return res.json({code: 1 , message:'Enter Email'});
    }
    if (!password) {
      return res.json({code: 1 , message:'Enter Password'});
    }
    if (!passwordConfirm) {
      return res.json({code: 1 , message:'Enter PasswordConfirm'});
    }
    if (req.body.password !== req.body.passwordConfirm) {
      return res.json({code: 1 , message:'Password doesn\'t match'});
    }
    next();
  }
};

