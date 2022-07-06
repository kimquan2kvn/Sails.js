/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
/**
 * UsersController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
var jwt = require('jsonwebtoken');
const { beforeCreate } = require('../models/Users');
const auth = require('../policies/auth');

module.exports = {
  checkAuth: function (req, res) {
    try {
      res.json({ code: 0 , message: 'Success' });
    } catch (error) {
      console.log(error);
    }
  },

  login: async function (req, res) {
    await Users.findOne({ email: req.body.email }).then(person => {
      var id = person.id;
      var token = jwt.sign({_id:id}, 'sails.config.sessionSecret', { expiresIn: '24h' });
      Users.validPassword(req.body.password, person, (err, valid) => {
        if (err) {
          return res.json(403, { code: 1 , message: 'Forbidden' });
        }
        if (!valid) {
          return res.json(401, {  code: 1 , message: 'Invalid username or password' });
        } else {
          res.cookie('access_token', token, {
            httpOnly: true,
          })
          .status(200).json({ code: 0 , message: 'Success', token: token });
        }
      });
    }).catch(err => {
      res.json( {code: 1 , message:'Email does not exist, pls register'});
      console.log(err);
    });
  },

  register: async function (req, res) {
    try {
      await Users.findOne({ email: req.body.email }).then(result => {
        if (result) {
          res.json({code: 1 , message:'Email already exist'});
        }
      });
      let {req.bo}
      // if (!req.body.firstName) {
      //   return res.json({code: 1 , message:'Enter Firstname'});
      // }
      // if (!req.body.lastName) {
      //   return res.json({code: 1 , message:'Enter Lastname'});
      // }
      // if (!req.body.email) {
      //   return res.json({code: 1 , message:'Enter Email'});
      // }
      // if (!req.body.password) {
      //   return res.json({code: 1 , message:'Enter Password'});
      // }
      // if (!req.body.passwordConfirm) {
      //   return res.json({code: 1 , message:'Enter PasswordConfirm'});
      // }
      if (req.body.password !== req.body.passwordConfirm) {
        return res.json({code: 1 , message:'Password doesn\'t match'});
      }
      const { firstName, lastName, email, password } = req.body;
      let newUser = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        role:'teacher'
      };
      await Users.create(newUser);
      res.json({code: 0 , message: 'Success'});
    }catch (error) {
      console.log(error);
    }
  },
};
