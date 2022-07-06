var jwt = require('jsonwebtoken');
module.exports = function (req, res, next) {
//   let accesToken = req.headers.cookie.split('=')[1];
  const authHeader = req.headers['authorization'];
  const token=authHeader && authHeader.split(' ')[1];
  if(token === null) {
    return res.sendStatus(401);
  }
  jwt.verify(token,'sails.config.sessionSecret',(err,id)=>{
    if(err){
      return res.sendStatus(403);
    }
    var id = req.id;
    return id._id;
  }
  );
};
