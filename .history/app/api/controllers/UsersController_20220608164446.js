/**
 * UsersController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

module.exports = {
  register:function(req, res) {
    if(!req.body.firstName) {
      return res.badRequest('Hãy điền firstName');
    }
    if(!req.body.lastName) {
      return res.badRequest('Hãy điền lastName');
    }
    if(!req.body.email) {
      return res.badRequest('Hãy điền email');
    }
    if(!req.body.password) {
      return res.badRequest('Hãy điền password');
    }
    if(!req.body.passwordConfirm) {
      return res.badRequest('Không được bỏ trống');
    }
  }
};

