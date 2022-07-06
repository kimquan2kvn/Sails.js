/**
 * UsersController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

module.exports={
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
      return res.send('Enter firstname');
    }
    if(!req.body.password){
      return res.send('enter firstname');
    }
    if(!req.body.passwordConfirm){
      return res.send('enter firstname');
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

  }
};

// module.exports = {x
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



// if (!email || !password || !username) {
//   return res.json(401, {err: 'Please fill in all the fields'});
// }
// Users.insertOne(newUser, (err, res) => {
//   if (err) {throw err;}
//   console.log('1 document inserted');
// });
// res.redirect('/');
//}


// create:function(req,res,next){
//   // CreateaUser with the params sent from
//   // the sign-up form-new.ejs
//   users.create(req.params.all(),function userCreated(err,user){
//     // If there's an error
//     if(err){
//       return next(err);
//     }
//     // After successfully creating the user
//     res.redirect('/users');
//     res.json(user);
//   });
// Users.save();

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
//   },

//   getUsers:function(req,res,next){
//     users.findOne(req.param('id'),(err,user)=>{
//       if(err)return next(err);
//        if(!user)return next();
//        res.view({
//          user:user
//       });
//    });
//   }
// }