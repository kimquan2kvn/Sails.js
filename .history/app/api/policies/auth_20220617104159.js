var jwt = require('jsonwebtoken');
module.exports = function (req, res, next) {
  try {
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
    });

  } catch (error) {
    res.status(500).json(error);
  }

};
