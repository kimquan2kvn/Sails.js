var jwt = require('jsonwebtoken');
// const Users = require('../models/Users');
module.exports = function (req, res, next) {
  try {
    const authHeader = req.headers['authorization'];
    const token=authHeader && authHeader.split(' ')[1];
    if(token === null) {
      return res.sendStatus(401);
    }
    var idUser = jwt.verify(token,'sails.config.sessionSecret');
      console.log(idUser._id);
      Users.findOne({_id:user._id}, (_err,data)=>{
        if(data) {
          // eslint-disable-next-line callback-return
          next();
        }else{
          res.json('Not permisson');
        }
      });
    }); catch (error) {
    res.status(500).json(error);
  }

};
