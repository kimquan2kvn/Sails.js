/**
 * Users.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    firstName:{
      type: String,
      required: true
    },

    lastName:{
      type: String,
      required: true
    },

    email:{
      type: String,
      required: true
    },

    password:{
      type: String,
      required: true
    },
  },
  datastores:'default'
};

