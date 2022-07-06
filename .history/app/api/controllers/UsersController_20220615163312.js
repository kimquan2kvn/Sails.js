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


module.exports = {
  test: function (req, res) {
    try {
      console.log(req.headers);
      res.json({ msg: 'true' });
    } catch (error) {
      console.log(error);
    }
  },

  login: async function (req, res) {
    await Users.findOne({ email: req.body.email }).then(person => {
      var id = person._id;
      var token = jwt.sign({_id:id}, 'sails.config.sessionSecret', { expiresIn: '24h' });
      Users.validPassword(req.body.password, person, (err, valid) => {
        if (err) {
          return res.json(403, { err: 'forbidden' });
        }
        if (!valid) {
          return res.json(401, { err: 'invalid username or password' });
        } else {
          res.json({ message: 'thanh cong', token: token });
          // res.cookie('access_token', token, {
          //   httpOnly: true,
          //   // secure: process.env.NODE_ENV === 'production',
          // })
          // .status(200).json({ message: 'Logged in successfully' });
          // // res.header(acssettoken,token);
        }
      });
    }).catch(err => {
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
      };
      await Users.create(newUser);
      console.log(newUser);
      res.redirect('/users/login');
    }catch (error) {
      console.log(error);
    }
  },
};


// getUsers:async(req,res)=>{
//   User.find((err,user)=>{
//     if(err){
//       return res.serverError({
//         success:false,
//         message:'Server Error'
//       });
//     }
//     return res.ok({
//       success:true,
//       user:user
//     });
//   });
// },