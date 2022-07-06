/**
 * UsersController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const Users = require('../models/Users');


module.exports = {
	// authenticate: function(req, res) {
  //   var email = req.param('email');
  //   var password = req.param('password');

  //   if (!email || !password) {
  //     return res.json(401, {err: 'username and password required'});
  //   }

  //   Users.findOneByEmail(email, function(_err, user) {
  //     if (!user) {
  //       return res.json(401, {err: 'invalid username or password'});
  //     }

  //     Users.validPassword(password, user, function(err, valid) {
  //       if (err) {
  //         return res.json(403, {err: 'forbidden'});
  //       }

  //       if (!valid) {
  //         return res.json(401, {err: 'invalid username or password'});
  //       } else {
  //         res.json({user: user, token: sailsTokenAuth.issueToken({sid: user.id})});
  //       }
  //     });
  //   })
  // },

  register: function(req, res) {
    //TODO: Do some validation on the input
    if (req.body.password !== req.body.confirmPassword) {
      return res.json(401, {err: 'Password doesn\'t match'});
    }

    Users.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password
    }).exec((err, user) => {
      if (err) {
        res.json(err.status, {err: err});
        return;
      }
      if (user) {
        Users.save
        res.json({user: user, token: sailsTokenAuth.issueToken({sid: user.id})});
      }
    });
  }
};
