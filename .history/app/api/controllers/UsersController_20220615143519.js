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


module.exports={
  login: async function(req, res) {
    await Users.findOne({email:req.body.email}).then(person=>{
      var id = person.id;
      var token = jwt.sign({_id:id}, 'sails.config.sessionSecret', { expiresIn:'24h'});
      Users.validPassword(req.body.password, person, (err, valid) => {
        if(err) {
          return res.json(403, {err: 'forbidden'});
        }
        if (!valid) {
          return res.json(401, {err: 'invalid username or password'});
        } else {
          res.json({message: 'thanh cong', token: token});
          // res.cookie('tokenKey', token);
          // res.redirect('/');
          res.header(acssettoken [, value]);
        }
      });
    }).catch(err=>{
      console.log(err);
    });
  },

  register:async function(req,res){
    await Users.findOne({email:req.body.email}).then(result=>{
      if(result) {
        res.send('Email already exist');
        res.redirect('/users/login');
      }
    });
    if(!req.body.firstName){
      return res.send('Enter Firstname');
    }
    if(!req.body.lastName){
      return res.send('Enter Lastname');
    }
    if(!req.body.email){
      return res.send('Enter Email');
    }
    if(!req.body.password){
      return res.send('Enter Password');
    }
    if(!req.body.passwordConfirm){
      return res.send('Enter PasswordConfirm');
    }
    if(req.body.password !== req.body.passwordConfirm) {
      return res.send('Password doesn\'t match');
    }
    try{
      const {firstName,lastName,email,password} = req.body;
      let newUser = {
        firstName:firstName,
        lastName:lastName,
        email:email,
        password:password,
      };
      await Users.create(newUser);
      console.log(newUser);
      res.redirect('/users/login');
    }catch(err){
      console.log(err);
      res.redirect('/users/register');
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
