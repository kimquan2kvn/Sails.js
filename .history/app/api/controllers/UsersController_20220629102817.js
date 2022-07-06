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
const { resOK, resErr } = require('../res/responses');


module.exports = {
  checkAuth: function (req, res) {
    try {
      resOK(req,res);
    } catch (error) {
      console.log(error);
    }
  },

  login: async function (req, res) {
    await Users.findOne({ email: req.body.email }).then(user => {
      var id = user.id;
      var token = jwt.sign({_id:id}, 'sails.config.sessionSecret', { expiresIn: '24h' });
      Users.validPassword(req.body.password, user, (err, valid) => {
        if (err) {
          return resErr(req,res,'Forbidden');
        }
        if (!valid) {
          return resErr(req,res,'Invalid username or password' );
        } else {
          res.cookie('access_token', token, {
            httpOnly: true,
          })
          .status(200).json({ code: 0 , message: 'Success', token: token });
        }
      });
    }).catch(err => {
      resErr(req,res,'Email does not exist, pls register');
      console.log(err);
    });
  },

  register: async function (req, res) {
    try {
      await Users.findOne({ email: req.body.email }).then(result => {
        if (result) {
          resErr(req,res,'Email already exist');
        }
      });
      const { firstName, lastName, email, password,passwordConfirm } = req.body;
      Users.validRegister(firstName,lastName,email,password,passwordConfirm );
      let newUser = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        role:'teacher'
      };
      await Users.create(newUser);
      resOK(req,res);
    }catch (error) {
      console.log(error);
    }
  },

  listusers: async function (req, res) {
    try {
      await Users.find({}).then
    } catch (error) {
      
    }
};
