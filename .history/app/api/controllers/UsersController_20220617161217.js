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

  login: async function (req, res) {
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

  register: async function (req, res) {
    try {
      await Users.findOne({ email: req.body.email }).then(result => {
        if (result) {
          res.send('Email already exist');
          res.redirect('/users/login');
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
      res.redirect('/users/login');
    }catch (error) {
      console.log(error);
    }
  },

  listUsers: function (req,res){
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

  createUsers:async function(req,res){
    try {
      if(req.data.role === 'user') {
        await Users.findOne({_id:req.data.id}).then(user=>{
          console.log(user);
        });

        Users.update({}).set({
          
        })
            user.lop = req.body.lop;
            user.namsinh = req.body.namsinh;
            user.tinh =  req.body.tinh;
            user.huyen = req.body.huyen;
            user.xa = req.body.xa;
          });
        res.json('Updated');
      }else {
        res.json('Not permission!');
      }
    } catch (error) {
      console.log(error);
    }
  }

};
