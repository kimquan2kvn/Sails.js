var jwt = require('jsonwebtoken');
const Users = require('../models/Users');
module.exports = function (req, res, next) {
  const authHeader = req.headers['authorization'];
  const token=authHeader && authHeader.split(' ')[1];
  if(token === null) {
    return res.sendStatus(401);
  }
  jwt.verify(token,'sails.config.sessionSecret',(err,user)=>{
    if(err){
      return res.sendStatus(403);
    }
    req.user=user;
    var idUser = user._id;
    awUsers.findOne({_id:idUser})
    next();
  }
  );
};
