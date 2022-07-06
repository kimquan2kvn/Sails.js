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
    console.log(user._id);
    Users.findOne({_id:idUser}, (_err,data)=>{
      if(data) {
        // eslint-disable-next-line callback-return
        next();
      }else{
        res.json('Not permisson');
      }
    });
  } catch (error) {
    res.status()
  }

};
