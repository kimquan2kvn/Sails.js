var bcrypt = require('bcryptjs');
module.exports = {
  friendlyName: 'Create user',
  description: 'Create a new user.',

  inputs: {
    firstName: {
      type: 'string'
    },
    lastName: {
      type: 'string'
    },
    email: {
      type: 'string'
    },
    password: {
      type: 'string'
    },
  },

  exits: {
    invalid: {
      responseType: 'badRequest',
      description: 'The provided email address and/or password are invalid.',
    },
    emailAlreadyInUse: {
      statusCode: 409,
      description: 'The provided email address is already in use.',
    },
  },
};
