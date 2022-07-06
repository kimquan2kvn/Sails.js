/**
 * UsersController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
// var bcrypt = require('bcryptjs');
// var jwt = require('jsonwebtoken');
const Users = require('../models/Users');


// module.exports = {
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

//   register: function(req, res) {
//     //TODO: Do some validation on the input
//     if (req.body.password !== req.body.confirmPassword) {
//       return res.json(401, {err: 'Password doesn\'t match'});
//     }

//     Users.create({
//       firstName: req.body.firstName,
//       lastName: req.body.lastName,
//       email: req.body.email,
//       password: req.body.password
//     }).exec((err, user) => {
//       if (err) {
//         res.json(err.status, {err: err});
//         return;
//       }
//       if (user) {
//         Users.save('sails');
//         // res.json({user: user, token: sailsTokenAuth.issueToken({sid: user.id})});
//       }
//     });
//   }


/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var Emailaddresses = require('machinepack-emailaddresses');

module.exports = {
   // patch /api/users/login
   login: async function(req, res) {
     var user = await Users.findOne({
       email: req.param('email')
     })
     if (!user) return res.notFound()
 
     await bcrypt.compare(req.param('password'), user.password)
 
     // if no errors were thrown, then grant them a new token
     // set these config vars in config/local.js, or preferably in config/env/production.js as an environment variable
     var token = jwt.sign({user: user.id}, sails.config.jwtSecret, {expiresIn: sails.config.jwtExpires})
     // set a cookie on the client side that they can't modify unless they sign out (just for web apps)
     res.cookie('sailsjwt', token, {
       signed: true,
       // domain: '.yourdomain.com', // always use this in production to whitelist your domain
       maxAge: sails.config.jwtExpires
     })
     // provide the token to the client in case they want to store it locally to use in the header (eg mobile/desktop apps)
     return res.ok(token)
   },
 
   // patch /api/users/logout
   logout: function(req, res) {
     res.clearCookie('sailsjwt')
     req.user = null
     return res.ok()
   },
 
   // post /api/users/register
   register: function(req, res) {
      if (_.isUndefined(req.param('email'))) {
        return res.badRequest('An email address is required.')
      }

      if (_.isUndefined(req.param('password'))) {
        return res.badRequest('A password is required.')
      }

      if (req.param('password').length < 8) {
        return res.badRequest('Password must be at least 8 characters.')
      }
      
      var user = sails.helpers.createUser({
        firstName: req.param('firstName'),
        lastName: req.param('lastName'),
        email: req.param('email'),
        password: req.param('password')
      })

        //  // after creating a user record, log them in at the same time by issuing their first jwt token and setting a cookie
        //  var token = jwt.sign({user: user.id}, sails.config.jwtSecret, {expiresIn: sails.config.jwtExpires})
        //  res.cookie('sailsjwt', token, {
        //    signed: true,
        //    // domain: '.yourdomain.com', // always use this in production to whitelist your domain
        //    maxAge: sails.config.jwtExpires
        //  })
 
        //  // if this is not an HTML-wanting browser, e.g. AJAX/sockets/cURL/etc.,
        //  // send a 200 response letting the user agent know the signup was successful.
        //  if (req.wantsJSON) {
        //    return res.ok(token)
        //  }
 
        //  // otherwise if this is an HTML-wanting browser, redirect to /welcome.
        //  return res.redirect('/')
  },
}




// };
