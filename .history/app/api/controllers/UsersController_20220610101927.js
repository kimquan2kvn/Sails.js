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
  register:function(req, res) {
    if(req.body.password !== req.body.passwordConfirm){
      return res.json(401, {err: 'Password not match'});
    }
    if(req.param('password').length < 8) {
			return res.badRequest('Password must be at least 8 characters.');
    }

    Users.findOne({email: req.body.email}).then(user=>{
      if(!user) {
        Users.create()
      }
    })
  }
};

