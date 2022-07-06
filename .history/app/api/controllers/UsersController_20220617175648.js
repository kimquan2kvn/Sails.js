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
      res.json({ msg: 'Token is true' });
    } catch (error) {
      console.log(error);
    }
  },

  login: async function (req, res,next) {
    await Users.findOne({ email: req.body.email }).then(person => {
      var id = person.id;
      var token = jwt.sign({_id:id}, 'sails.config.sessionSecret', { expiresIn: '24h' });
      Users.validPassword(req.body.password, person, (err, valid) => {
        if (err) {
          return res.json(403, { err: 'forbidden' });
        }
        if (!valid) {
          return res.json(401, { err: 'invalid username or password' });
        } else {
          res.cookie('access_token', token, {
            httpOnly: true,
          })
          .status(200).json({ message: 'Logged in successfully',token: token });
        }
      });
    }).catch(err => {
      res.json('Email does not exist, pls register');
      console.log(err);
    });
  },

  register: async function (req, res,next) {
    try {
      await Users.findOne({ email: req.body.email }).then(result => {
        if (result) {
          res.send('Email already exist');
        }
      });
      if (!req.body.firstName) {
        return res.send('Enter Firstname');
      }
      if (!req.body.lastName) {
        return res.send('Enter Lastname');
      }
      if (!req.body.email) {
        return res.send('Enter Email');
      }
      if (!req.body.password) {
        return res.send('Enter Password');
      }
      if (!req.body.passwordConfirm) {
        return res.send('Enter PasswordConfirm');
      }
      if (req.body.password !== req.body.passwordConfirm) {
        return res.send('Password doesn\'t match');
      }
      const { firstName, lastName, email, password } = req.body;
      let newUser = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        role:'user'
      };
      await Users.create(newUser);
      res.json('Register Success');
    }catch (error) {
      console.log(error);
    }
  },

  listUsers: function (req,res,next){
    try {
      if(req.data.role === 'user' || req.data.role === 'admin'){
        Users.find({},(err,user)=>{
          if(err){
            return res.serverError({
              success:false,
              message:'Server Error'
            });
          }
          return res.json({
            success:true,
            user:user
          });
        });
      }else {
        res.json('Not permission!');
      }
    } catch (error) {
      console.log(error);
    }
  },

  createUsers:async function(req,res,next){
    try {
      if(req.data.role === 'user') {
        await Users.update({_id:req.data.id}).set({
          lop : req.body.lop,
          namsinh : req.body.namsinh,
          tinh :  req.body.tinh,
          huyen : req.body.huyen,
          xa : req.body.xa
        });
        res.json('Updated');
      }else {
        res.json('Not permission!');
      }
    } catch (error) {
      console.log(error);
    }
  },

  editUsers: async function(req,res,next){
    try {
      if(req.data.role === 'user' || req.data.role === 'admin') {
        await Users.update({_id:req.data.id}).set({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email:req.body.email,
          lop : req.body.lop,
          namsinh : req.body.namsinh,
          tinh :  req.body.tinh,
          huyen : req.body.huyen,
          xa : req.body.xa
        });
        res.json('Edit Success');
      }else {
        res.json('Not permission!');
      }
    } catch (error) {
      console.log(error);
    }
  },

  deleteUsers: function(req,res,next){

  }
};
