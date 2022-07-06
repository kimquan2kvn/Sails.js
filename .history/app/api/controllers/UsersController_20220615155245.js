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
      res.json({ msg: 'true' })
    } catch (error) {
      console.log(error);
    }
  },

  login: async function (req, res) {
    await Users.findOne({ email: req.body.email }).then(person => {
      var id = person.id;
      var token = jwt.sign({ _id: id }, 'sails.config.sessionSecret', { expiresIn: '24h' });
      Users.validPassword(req.body.password, person, (err, valid) => {
        if (err) {
          return res.json(403, { err: 'forbidden' });
        }
        if (!valid) {
          return res.json(401, { err: 'invalid username or password' });
        } else {
          res.json({ message: 'thanh cong', token: token });


          // res.header(acssettoken,token);
        }
      });
    }).catch(err => {
      console.log(err);
    });
  },

  register: async function (req, res) {
    try {
      
    } catch (error) {
      
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
