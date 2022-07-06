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

User.findOne({email:req.body.email}).then(user=>{
            if(!user){
                const newUser = new User({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    password: req.body.password,
                });
        
                // hash password
                bcrypt.genSalt(10, function(err, salt) {
                    bcrypt.hash(newUser.password, salt, function(err, hash) {
                        newUser.password = hash;
                        newUser.save();
                        req.flash('success_message', 'Đăng ký thành công, hãy đăng nhập');
                        res.redirect('/login');
                    });
                });
            }else{
                req.flash('error_message', 'Email đã tồn tại!');
                res.redirect('/register');
            }
        })
  }
};

